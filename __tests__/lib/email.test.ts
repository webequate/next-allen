import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  escapeHtml,
  buildReplyMailto,
  buildHtmlEmail,
  buildPlainText,
  sendContactEmail,
} from "@/lib/email";
import type { ContactForm } from "@/interfaces/ContactForm";

// ── nodemailer mock ──────────────────────────────────────────────────────────

const { mockSendMail, mockCreateTransport } = vi.hoisted(() => {
  const mockSendMail = vi.fn().mockResolvedValue({ messageId: "test-id" });
  const mockCreateTransport = vi.fn().mockReturnValue({ sendMail: mockSendMail });
  return { mockSendMail, mockCreateTransport };
});

vi.mock("nodemailer", () => ({
  default: { createTransport: mockCreateTransport },
}));

// ── shared fixture ───────────────────────────────────────────────────────────

const base: ContactForm = {
  name: "Alice",
  email: "alice@example.com",
  subject: "Test subject",
  message: "Hello there",
};

// ── escapeHtml ───────────────────────────────────────────────────────────────

describe("escapeHtml", () => {
  it("escapes ampersands", () => {
    expect(escapeHtml("a & b")).toBe("a &amp; b");
  });

  it("escapes less-than and greater-than", () => {
    expect(escapeHtml("<tag>")).toBe("&lt;tag&gt;");
  });

  it("escapes double quotes", () => {
    expect(escapeHtml('say "hello"')).toBe("say &quot;hello&quot;");
  });

  it("escapes single quotes", () => {
    expect(escapeHtml("it's here")).toBe("it&#039;s here");
  });

  it("escapes all special chars in one string", () => {
    expect(escapeHtml(`<a href="x" title='y'>link & more</a>`)).toBe(
      "&lt;a href=&quot;x&quot; title=&#039;y&#039;&gt;link &amp; more&lt;/a&gt;"
    );
  });

  it("returns plain strings unchanged", () => {
    expect(escapeHtml("nothing special here")).toBe("nothing special here");
  });

  it("handles empty string", () => {
    expect(escapeHtml("")).toBe("");
  });
});

// ── buildReplyMailto ─────────────────────────────────────────────────────────

describe("buildReplyMailto", () => {
  it("returns a mailto: URL", () => {
    expect(buildReplyMailto(base)).toMatch(/^mailto:/);
  });

  it("URL-encodes the recipient email address", () => {
    const result = buildReplyMailto(base);
    expect(result).toContain(encodeURIComponent("alice@example.com"));
  });

  it("prefixes the subject with Re:", () => {
    const result = buildReplyMailto(base);
    expect(result).toContain(encodeURIComponent("Re: Test subject"));
  });

  it("quotes each line of the message with > ", () => {
    const data = { ...base, message: "hello" };
    const result = buildReplyMailto(data);
    expect(result).toContain(encodeURIComponent("> hello"));
  });

  it("quotes every line of a multi-line message", () => {
    const data = { ...base, message: "line1\nline2\nline3" };
    const result = buildReplyMailto(data);
    expect(result).toContain(encodeURIComponent("> line1\n> line2\n> line3"));
  });
});

// ── buildHtmlEmail ───────────────────────────────────────────────────────────

describe("buildHtmlEmail", () => {
  it("returns a valid HTML document", () => {
    const html = buildHtmlEmail(base);
    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toContain("</html>");
  });

  it("includes the escaped name", () => {
    const html = buildHtmlEmail({ ...base, name: "<Alice>" });
    expect(html).toContain("&lt;Alice&gt;");
    expect(html).not.toContain("<Alice>");
  });

  it("includes the escaped email", () => {
    const html = buildHtmlEmail({ ...base, email: "a&b@test.com" });
    expect(html).toContain("a&amp;b@test.com");
    expect(html).not.toContain("a&b@test.com");
  });

  it("includes the escaped subject", () => {
    const html = buildHtmlEmail({ ...base, subject: 'Hello "World"' });
    expect(html).toContain("Hello &quot;World&quot;");
  });

  it("converts newlines in message to <br />", () => {
    const html = buildHtmlEmail({ ...base, message: "line1\nline2" });
    expect(html).toContain("line1<br />line2");
  });

  it("falls back to a default subject when subject is empty", () => {
    const html = buildHtmlEmail({ ...base, subject: "" });
    expect(html).toContain("New contact form submission");
  });

  it("includes a reply mailto link", () => {
    const html = buildHtmlEmail(base);
    expect(html).toContain("mailto:");
    expect(html).toContain("Reply to");
  });
});

// ── buildPlainText ───────────────────────────────────────────────────────────

describe("buildPlainText", () => {
  const receivedAt = "2026-01-01T12:00:00.000Z";

  it("includes the sender name", () => {
    expect(buildPlainText(base, receivedAt)).toContain("Name: Alice");
  });

  it("includes the sender email", () => {
    expect(buildPlainText(base, receivedAt)).toContain(
      "Email: alice@example.com"
    );
  });

  it("includes the subject", () => {
    expect(buildPlainText(base, receivedAt)).toContain(
      "Subject: Test subject"
    );
  });

  it("includes the trimmed message", () => {
    const text = buildPlainText(
      { ...base, message: "  Hello  " },
      receivedAt
    );
    expect(text).toContain("Hello");
    expect(text).not.toContain("  Hello  ");
  });

  it("includes the receivedAt timestamp", () => {
    expect(buildPlainText(base, receivedAt)).toContain(
      `Received: ${receivedAt}`
    );
  });

  it("includes the site URL", () => {
    expect(buildPlainText(base, receivedAt)).toContain(
      "https://allenhaydenjohnson.com"
    );
  });
});

// ── sendContactEmail ─────────────────────────────────────────────────────────

describe("sendContactEmail", () => {
  beforeEach(() => {
    process.env.GMAIL_USER = "sender@gmail.com";
    process.env.GMAIL_APP_PASS = "app-pass-123";
    process.env.EMAIL_FROM = "from@example.com";
    process.env.EMAIL_TO = "to@example.com";
    delete process.env.EMAIL_CC;
    mockSendMail.mockClear();
    mockCreateTransport.mockClear();
  });

  afterEach(() => {
    delete process.env.GMAIL_USER;
    delete process.env.GMAIL_APP_PASS;
    delete process.env.EMAIL_FROM;
    delete process.env.EMAIL_TO;
    delete process.env.EMAIL_CC;
  });

  it("throws when GMAIL_USER is missing", async () => {
    delete process.env.GMAIL_USER;
    await expect(sendContactEmail(base)).rejects.toThrow(
      "Email transport credentials missing"
    );
  });

  it("throws when GMAIL_APP_PASS is missing", async () => {
    delete process.env.GMAIL_APP_PASS;
    await expect(sendContactEmail(base)).rejects.toThrow(
      "Email transport credentials missing"
    );
  });

  it("throws when EMAIL_FROM is missing", async () => {
    delete process.env.EMAIL_FROM;
    await expect(sendContactEmail(base)).rejects.toThrow(
      "EMAIL_FROM and EMAIL_TO must be set"
    );
  });

  it("throws when EMAIL_TO is missing", async () => {
    delete process.env.EMAIL_TO;
    await expect(sendContactEmail(base)).rejects.toThrow(
      "EMAIL_FROM and EMAIL_TO must be set"
    );
  });

  it("creates a nodemailer transport with Gmail SMTP config", async () => {
    await sendContactEmail(base);
    expect(mockCreateTransport).toHaveBeenCalledWith(
      expect.objectContaining({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: { user: "sender@gmail.com", pass: "app-pass-123" },
      })
    );
  });

  it("sends mail with the correct from/to/subject fields", async () => {
    await sendContactEmail(base);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "from@example.com",
        to: "to@example.com",
        subject: `Website Inquiry: ${base.subject}`,
      })
    );
  });

  it("sends both html and plain text versions", async () => {
    await sendContactEmail(base);
    const call = mockSendMail.mock.calls[0][0];
    expect(call.html).toContain("<!doctype html>");
    expect(typeof call.text).toBe("string");
    expect(call.text.length).toBeGreaterThan(0);
  });

  it("includes CC when EMAIL_CC is set", async () => {
    process.env.EMAIL_CC = "cc@example.com";
    await sendContactEmail(base);
    expect(mockSendMail).toHaveBeenCalledWith(
      expect.objectContaining({ cc: "cc@example.com" })
    );
  });

  it("resolves without throwing on successful send", async () => {
    await expect(sendContactEmail(base)).resolves.toBeUndefined();
  });
});
