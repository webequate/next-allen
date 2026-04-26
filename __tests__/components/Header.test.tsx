import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import type { SocialLink } from "@/types/basics";

vi.mock("next-themes", () => ({
  useTheme: vi.fn(() => ({ theme: "dark", setTheme: vi.fn() })),
}));

const mockSocialLink: SocialLink = {
  name: "instagram",
  handle: "testhandle",
  url: "https://instagram.com/testhandle",
};

function renderHeader() {
  return render(<Header socialLink={mockSocialLink} />);
}

function getDesktopNav(): HTMLElement {
  return document.querySelector(".nav-primary") as HTMLElement;
}

describe("Header", () => {
  describe("nav link rendering", () => {
    it("renders all four navigation links in the desktop nav", () => {
      renderHeader();
      const nav = getDesktopNav();
      expect(within(nav).getByRole("link", { name: "Home" })).toBeInTheDocument();
      expect(within(nav).getByRole("link", { name: "Photos" })).toBeInTheDocument();
      expect(within(nav).getByRole("link", { name: "Videos" })).toBeInTheDocument();
      expect(within(nav).getByRole("link", { name: "Contact" })).toBeInTheDocument();
    });

    it("renders the home logo link (identified by its title attribute)", () => {
      renderHeader();
      // The logo link has title="Home"; nav links only have aria-label="Home"
      expect(screen.getByTitle("Home")).toBeInTheDocument();
    });

    it("renders the social link button", () => {
      renderHeader();
      expect(
        screen.getByRole("link", { name: mockSocialLink.name })
      ).toHaveAttribute("href", mockSocialLink.url);
    });
  });

  describe("active link detection", () => {
    it("marks Home as active on /", () => {
      vi.mocked(usePathname).mockReturnValue("/");
      renderHeader();
      const nav = getDesktopNav();
      expect(within(nav).getByRole("link", { name: "Home" })).toHaveClass("active");
      expect(within(nav).getByRole("link", { name: "Photos" })).not.toHaveClass("active");
    });

    it("marks Home as active on /featured/anything", () => {
      vi.mocked(usePathname).mockReturnValue("/featured/my-post");
      renderHeader();
      expect(within(getDesktopNav()).getByRole("link", { name: "Home" })).toHaveClass("active");
    });

    it("marks Photos as active on /photos", () => {
      vi.mocked(usePathname).mockReturnValue("/photos");
      renderHeader();
      expect(within(getDesktopNav()).getByRole("link", { name: "Photos" })).toHaveClass("active");
    });

    it("marks Photos as active on /album/anything", () => {
      vi.mocked(usePathname).mockReturnValue("/album/switzerland");
      renderHeader();
      expect(within(getDesktopNav()).getByRole("link", { name: "Photos" })).toHaveClass("active");
    });

    it("marks Photos as active on nested photo routes", () => {
      vi.mocked(usePathname).mockReturnValue("/album/switzerland/photo/3");
      renderHeader();
      expect(within(getDesktopNav()).getByRole("link", { name: "Photos" })).toHaveClass("active");
    });

    it("marks Videos as active on /videos", () => {
      vi.mocked(usePathname).mockReturnValue("/videos");
      renderHeader();
      expect(within(getDesktopNav()).getByRole("link", { name: "Videos" })).toHaveClass("active");
    });

    it("marks Videos as active on /video/anything (individual video route)", () => {
      vi.mocked(usePathname).mockReturnValue("/video/booka-shade");
      renderHeader();
      expect(within(getDesktopNav()).getByRole("link", { name: "Videos" })).toHaveClass("active");
    });

    it("marks Contact as active on /contact", () => {
      vi.mocked(usePathname).mockReturnValue("/contact");
      renderHeader();
      expect(within(getDesktopNav()).getByRole("link", { name: "Contact" })).toHaveClass("active");
    });

    it("marks no nav link as active on an unmatched path", () => {
      vi.mocked(usePathname).mockReturnValue("/about");
      renderHeader();
      const nav = getDesktopNav();
      expect(within(nav).getByRole("link", { name: "Home" })).not.toHaveClass("active");
      expect(within(nav).getByRole("link", { name: "Photos" })).not.toHaveClass("active");
      expect(within(nav).getByRole("link", { name: "Videos" })).not.toHaveClass("active");
      expect(within(nav).getByRole("link", { name: "Contact" })).not.toHaveClass("active");
    });
  });

  describe("mobile menu", () => {
    it("mobile nav does not have the 'show' class initially", () => {
      renderHeader();
      expect(document.querySelector(".nav-mobile")).not.toHaveClass("show");
    });

    it("adds 'show' class to mobile nav after hamburger click", async () => {
      const user = userEvent.setup();
      renderHeader();
      await user.click(screen.getByRole("button", { name: /hamburger menu/i }));
      expect(document.querySelector(".nav-mobile")).toHaveClass("show");
    });

    it("removes 'show' class from mobile nav after second hamburger click", async () => {
      const user = userEvent.setup();
      renderHeader();
      const btn = screen.getByRole("button", { name: /hamburger menu/i });
      await user.click(btn);
      await user.click(btn);
      expect(document.querySelector(".nav-mobile")).not.toHaveClass("show");
    });
  });
});
