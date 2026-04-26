import "@testing-library/jest-dom";
import { createElement } from "react";
import { vi } from "vitest";

// Render next/link as a plain <a> so tests don't need a router context
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string;
    children: unknown;
    [k: string]: unknown;
  }) =>
    createElement(
      "a",
      { href, ...props },
      children as Parameters<typeof createElement>[2]
    ),
}));

// Default pathname mock — override per-test with vi.mocked(usePathname).mockReturnValue(...)
vi.mock("next/navigation", () => ({
  usePathname: vi.fn().mockReturnValue("/"),
  useRouter: vi.fn(() => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() })),
}));
