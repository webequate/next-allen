import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import PhotoHeader from "@/components/PhotoHeader";

describe("PhotoHeader", () => {
  it("renders the photo title", () => {
    render(<PhotoHeader title="Geneva, 1998" path="switzerland" />);
    expect(screen.getByRole("heading", { name: "Geneva, 1998" })).toBeInTheDocument();
  });

  describe("prev navigation", () => {
    it("renders a prev link when prevId is provided", () => {
      render(<PhotoHeader title="Photo" prevId={3} path="switzerland" />);
      expect(
        screen.getByRole("link", { name: /previous photo/i })
      ).toHaveAttribute("href", "/album/switzerland/photo/3");
    });

    it("does not render a prev link when prevId is null", () => {
      render(<PhotoHeader title="Photo" prevId={null} path="switzerland" />);
      expect(
        screen.queryByRole("link", { name: /previous photo/i })
      ).not.toBeInTheDocument();
    });

    it("does not render a prev link when prevId is undefined", () => {
      render(<PhotoHeader title="Photo" path="switzerland" />);
      expect(
        screen.queryByRole("link", { name: /previous photo/i })
      ).not.toBeInTheDocument();
    });

    it("does not render a prev link when prevId is 0 (falsy)", () => {
      // Photo IDs start at 1, but the falsy check means 0 silently suppresses the link
      render(<PhotoHeader title="Photo" prevId={0} path="switzerland" />);
      expect(
        screen.queryByRole("link", { name: /previous photo/i })
      ).not.toBeInTheDocument();
    });
  });

  describe("next navigation", () => {
    it("renders a next link when nextId is provided", () => {
      render(<PhotoHeader title="Photo" nextId={5} path="switzerland" />);
      expect(
        screen.getByRole("link", { name: /next photo/i })
      ).toHaveAttribute("href", "/album/switzerland/photo/5");
    });

    it("does not render a next link when nextId is null", () => {
      render(<PhotoHeader title="Photo" nextId={null} path="switzerland" />);
      expect(
        screen.queryByRole("link", { name: /next photo/i })
      ).not.toBeInTheDocument();
    });

    it("does not render a next link when nextId is undefined", () => {
      render(<PhotoHeader title="Photo" path="switzerland" />);
      expect(
        screen.queryByRole("link", { name: /next photo/i })
      ).not.toBeInTheDocument();
    });
  });

  it("renders prev and next links simultaneously when both IDs are provided", () => {
    render(
      <PhotoHeader title="Photo" prevId={2} nextId={4} path="switzerland" />
    );
    expect(
      screen.getByRole("link", { name: /previous photo/i })
    ).toHaveAttribute("href", "/album/switzerland/photo/2");
    expect(
      screen.getByRole("link", { name: /next photo/i })
    ).toHaveAttribute("href", "/album/switzerland/photo/4");
  });
});
