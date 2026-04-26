import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "next-themes";
import ThemeSwitcher from "@/components/ThemeSwitcher";

vi.mock("next-themes", () => ({
  useTheme: vi.fn(),
}));

vi.mock("react-icons/fa", () => ({
  FaSun: () => <span data-testid="icon-sun" />,
  FaMoon: () => <span data-testid="icon-moon" />,
}));

describe("ThemeSwitcher", () => {
  it("renders the Sun icon when theme is 'dark' (toggle target is light)", () => {
    const mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
      resolvedTheme: "dark",
      themes: ["light", "dark"],
      systemTheme: undefined,
      forcedTheme: undefined,
    });

    render(<ThemeSwitcher />);
    expect(screen.getByTestId("icon-sun")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-moon")).not.toBeInTheDocument();
  });

  it("renders the Moon icon when theme is 'light'", () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: "light",
      setTheme: vi.fn(),
      resolvedTheme: "light",
      themes: ["light", "dark"],
      systemTheme: undefined,
      forcedTheme: undefined,
    });

    render(<ThemeSwitcher />);
    expect(screen.getByTestId("icon-moon")).toBeInTheDocument();
    expect(screen.queryByTestId("icon-sun")).not.toBeInTheDocument();
  });

  it("calls setTheme('light') when clicked in dark mode", async () => {
    const user = userEvent.setup();
    const mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: "dark",
      setTheme: mockSetTheme,
      resolvedTheme: "dark",
      themes: ["light", "dark"],
      systemTheme: undefined,
      forcedTheme: undefined,
    });

    render(<ThemeSwitcher />);
    await user.click(screen.getByTestId("icon-sun").parentElement!);
    expect(mockSetTheme).toHaveBeenCalledWith("light");
  });

  it("calls setTheme('dark') when clicked in light mode", async () => {
    const user = userEvent.setup();
    const mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: "light",
      setTheme: mockSetTheme,
      resolvedTheme: "light",
      themes: ["light", "dark"],
      systemTheme: undefined,
      forcedTheme: undefined,
    });

    render(<ThemeSwitcher />);
    await user.click(screen.getByTestId("icon-moon").parentElement!);
    expect(mockSetTheme).toHaveBeenCalledWith("dark");
  });
});
