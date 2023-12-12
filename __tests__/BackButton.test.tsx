import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BackButton from "../src/app/components/Reusable/BackButton";

describe("BackButton Component", () => {
    test("renders with BackButton", () => {
    render(<BackButton/>);
    expect(screen.getByRole("link", { name: "Back" })).toBeInTheDocument();
  });

  test("BackButton navigates to the correct URL", () => {
    render(<BackButton />);
    const linkElement = screen.getByRole("link", { name: "Back" });

    fireEvent.click(linkElement);
    expect(window.location.pathname).toBe('/');
  });
})
