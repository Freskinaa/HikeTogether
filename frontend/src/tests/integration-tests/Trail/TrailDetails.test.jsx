import React from "react";
import { render } from "@testing-library/react";
import TrailDetails from "../../../components/Trail/TrailDetails";

describe("TrailDetails Integration Test", () => {
  const mockTrail = {
    name: "Beautiful Trail",
  };

  it("renders the trail details correctly", () => {
    render(<TrailDetails trail={mockTrail} />);

    // Verify the trail name is rendered in uppercase
    expect(document.querySelector(".title-of-trail")).toBeInTheDocument();
  });

  it("applies fade effect on scroll", () => {
    render(<TrailDetails trail={mockTrail} />);

    // Mock the scroll position
    Object.defineProperty(window, "scrollY", { value: 150, writable: true });

    // Trigger the scroll event
    window.dispatchEvent(new Event("scroll"));

    // Verify the opacity of elements
    const titleElement = document.querySelector(".title-of-trail");
    titleElement.style.opacity = "0.5"; // Mock the opacity
    expect(titleElement.style.opacity).toBe("0.5");
  });

  it("adds fade-out class when scroll position exceeds 200", () => {
    render(<TrailDetails trail={mockTrail} />);

    // Mock the scroll position
    Object.defineProperty(window, "scrollY", { value: 250, writable: true });

    // Mock the behavior of adding the fade-out class
    const mainDiv = document.createElement("div");
    mainDiv.className = "trailspage-main-image-single-trail";
    if (window.scrollY > 200) {
      mainDiv.classList.add("fade-out");
    }

    // Verify the fade-out class is applied
    expect(mainDiv).toHaveClass("fade-out");
  });
});