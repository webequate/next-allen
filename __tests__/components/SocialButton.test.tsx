import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import SocialButton from "@/components/SocialButton";

vi.mock("react-icons/fa", () => ({
  FaFacebook: () => <span data-testid="icon-facebook" />,
  FaGithub: () => <span data-testid="icon-github" />,
  FaInstagram: () => <span data-testid="icon-instagram" />,
  FaLinkedin: () => <span data-testid="icon-linkedin" />,
  FaTwitter: () => <span data-testid="icon-twitter" />,
  FaYoutube: () => <span data-testid="icon-youtube" />,
}));

describe("SocialButton", () => {
  it("renders a link with the correct href", () => {
    render(<SocialButton name="github" url="https://github.com/user" />);
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute(
      "href",
      "https://github.com/user"
    );
  });

  it("opens in a new tab", () => {
    render(<SocialButton name="github" url="https://github.com/user" />);
    expect(screen.getByRole("link", { name: "github" })).toHaveAttribute(
      "target",
      "_blank"
    );
  });

  it.each([
    ["instagram", "icon-instagram"],
    ["facebook", "icon-facebook"],
    ["github", "icon-github"],
    ["linkedin", "icon-linkedin"],
    ["twitter", "icon-twitter"],
    ["youtube", "icon-youtube"],
  ])("renders the correct icon for name '%s'", (name, testId) => {
    render(<SocialButton name={name} url="https://example.com" />);
    expect(screen.getByTestId(testId)).toBeInTheDocument();
  });

  it("falls back to the Facebook icon for an unknown name", () => {
    render(<SocialButton name="unknown-platform" url="https://example.com" />);
    expect(screen.getByTestId("icon-facebook")).toBeInTheDocument();
  });
});
