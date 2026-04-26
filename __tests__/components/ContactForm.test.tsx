import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContactForm from "@/components/ContactForm";

describe("ContactForm", () => {
  let mockFetch: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders all visible form fields and submit button", () => {
    render(<ContactForm />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i })
    ).toBeInTheDocument();
  });

  it("honeypot field is present but positioned off-screen", () => {
    const { container } = render(<ContactForm />);
    const honeypot = container.querySelector('input[name="website"]');
    expect(honeypot).toBeInTheDocument();
    // The wrapper has absolute positioning far to the left so humans can't see it
    const wrapper = honeypot!.parentElement!;
    expect(wrapper.style.position).toBe("absolute");
    expect(wrapper.style.left).toBe("-5000px");
  });

  it("updates form fields as the user types", async () => {
    const user = userEvent.setup();
    render(<ContactForm />);

    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hello");
    await user.type(screen.getByLabelText("Message"), "Test message");

    expect(screen.getByLabelText("Name")).toHaveValue("Alice");
    expect(screen.getByLabelText("Email")).toHaveValue("alice@example.com");
    expect(screen.getByLabelText("Subject")).toHaveValue("Hello");
    expect(screen.getByLabelText("Message")).toHaveValue("Test message");
  });

  it("shows 'Sending...' and disables the button while submitting", async () => {
    const user = userEvent.setup();
    // Never resolves during the test — keeps the component in submitting state
    mockFetch.mockReturnValue(new Promise(() => {}));

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hello");
    await user.type(screen.getByLabelText("Message"), "Test");

    await user.click(screen.getByRole("button", { name: /send message/i }));

    // The aria-label stays "Send Message" but the visible span text changes
    const button = screen.getByRole("button", { name: /send message/i });
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent(/sending/i);
  });

  it("shows a success message and resets the form on successful submission", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Email sent successfully!" }),
    });

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hello");
    await user.type(screen.getByLabelText("Message"), "Test message");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(
        screen.getByText("Email sent successfully!")
      ).toBeInTheDocument()
    );

    // Form should be reset
    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getByLabelText("Email")).toHaveValue("");
    expect(screen.getByLabelText("Subject")).toHaveValue("");
    expect(screen.getByLabelText("Message")).toHaveValue("");
  });

  it("shows an error message when the API returns a non-ok response", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Something went wrong on the server." }),
    });

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hi");
    await user.type(screen.getByLabelText("Message"), "Test");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(
        screen.getByText("Something went wrong on the server.")
      ).toBeInTheDocument()
    );
  });

  it("shows a fallback error message on network failure", async () => {
    const user = userEvent.setup();
    mockFetch.mockRejectedValue(new Error("Network error"));

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hi");
    await user.type(screen.getByLabelText("Message"), "Test");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/failed to send email/i)
      ).toBeInTheDocument()
    );
  });

  it("POSTs form data as JSON to /api/send-email", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Sent" }),
    });

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Name"), "Bob");
    await user.type(screen.getByLabelText("Email"), "bob@example.com");
    await user.type(screen.getByLabelText("Subject"), "Greeting");
    await user.type(screen.getByLabelText("Message"), "Hey!");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    const [url, options] = mockFetch.mock.calls[0];
    expect(url).toBe("/api/send-email");
    expect(options.method).toBe("POST");
    const body = JSON.parse(options.body);
    expect(body.name).toBe("Bob");
    expect(body.email).toBe("bob@example.com");
    expect(body.website).toBe(""); // honeypot should be empty
  });

  it("re-enables the button after submission completes", async () => {
    const user = userEvent.setup();
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Done" }),
    });

    render(<ContactForm />);
    await user.type(screen.getByLabelText("Name"), "Alice");
    await user.type(screen.getByLabelText("Email"), "alice@example.com");
    await user.type(screen.getByLabelText("Subject"), "Hi");
    await user.type(screen.getByLabelText("Message"), "Test");
    await user.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /send message/i })
      ).not.toBeDisabled()
    );
  });
});
