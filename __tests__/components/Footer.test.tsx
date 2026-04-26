import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer";
import type { SocialLink } from "@/types/basics";

const mockSocialLinks: SocialLink[] = [
  { name: "instagram", handle: "testhandle", url: "https://instagram.com/testhandle" },
  { name: "github", handle: "testuser", url: "https://github.com/testuser" },
];

function renderFooter() {
  return render(<Footer name="Allen Johnson" socialLinks={mockSocialLinks} />);
}

function getNav(): HTMLElement {
  return document.querySelector(".nav-secondary") as HTMLElement;
}

describe("Footer", () => {
  describe("nav link rendering", () => {
    it("renders all four navigation links", () => {
      renderFooter();
      const nav = getNav();
      expect(within(nav).getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(within(nav).getByRole("link", { name: "Photos" })).toBeInTheDocument();
      expect(within(nav).getByRole("link", { name: "Videos" })).toBeInTheDocument();
      // aria-label="Contact" is the accessible name; visible text is "Contact Me"
      expect(within(nav).getByRole("link", { name: "Contact" })).toBeInTheDocument();
    });

    it("renders all social link buttons", () => {
      renderFooter();
      expect(screen.getByRole("link", { name: "instagram" })).toHaveAttribute(
        "href",
        "https://instagram.com/testhandle"
      );
      expect(screen.getByRole("link", { name: "github" })).toHaveAttribute(
        "href",
        "https://github.com/testuser"
      );
    });
  });

  describe("active link detection", () => {
    it("marks Home as active on /", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      renderFooter();
      expect(within(getNav()).getByRole("link", { name: "Home" })).toHaveClass("active");
    });

    it("marks Home as active on /featured/anything", () => {
      vi.mocked(usePathname).mockReturnValue("/featured/post");
      renderFooter();
      expect(within(getNav()).getByRole("link", { name: "Home" })).toHaveClass("active");
    });

    it("marks Photos as active on /photos (exact match)", () => {
      vi.mocked(usePathname).mockReturnValue("/photos");
      renderFooter();
      expect(within(getNav()).getByRole("link", { name: "Photos" })).toHaveClass("active");
    });

    it("does NOT mark Photos as active on /photos/sub-path (unlike Header)", () => {
      // Footer uses pathname === "/photos" (exact); Header uses startsWith("/photos")
      vi.mocked(usePathname).mockReturnValue("/photos/something");
      renderFooter();
      expect(within(getNav()).getByRole("link", { name: "Photos" })).not.toHaveClass("active");
    });

    it("marks Photos as active on /album/anything", () => {
      vi.mocked(usePathname).mockReturnValue("/album/switzerland");
      renderFooter();
      expect(within(getNav()).getByRole("link", { name: "Photos" })).toHaveClass("active");
    });

    it("marks Photos as active on nested photo routes", () => {
      vi.mocked(usePathname).mockReturnValue("/album/switzerland/photo/5");
      renderFooter();
      expect(within(getNav()).getByRole("link", { name: "Photos" })).toHaveClass("active");
    });

    it("marks Videos as active on /videos", () => {
      vi.mocked(usePathname).mockReturnValue("/videos");
      renderFooter();
      expect(within(getNav()).getByRole("link", { name: "Videos" })).toHaveClass("active");
    });

    it("marks Videos as active on /video/anything", () => {
      vi.mocked(usePathname).mockReturnValue("/video/booka-shade");
      renderFooter();
      expect(within(getNav()).getByRole("link", { name: "Videos" })).toHaveClass("active");
    });

    it("marks Contact as active on /contact", () => {
      vi.mocked(usePathname).mockReturnValue("/contact");
      renderFooter();
      // aria-label="Contact" is the accessible name; visible text is "Contact Me"
      expect(within(getNav()).getByRole("link", { name: "Contact" })).toHaveClass("active");
    });
  });
});
