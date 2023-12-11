import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EntryForm from "../src/app/components/CreateEntry/EntryForm";
import * as actions from "../src/app/actions";

jest.mock("../src/app/actions", () => ({
  ...jest.requireActual("../src/app/actions"),
  createEntry: jest.fn(),
}));

describe("EntryForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders EntryForm", () => {
    render(<EntryForm />);
    expect(screen.getByText("Create New Entry")).toBeInTheDocument();
  });

  test("handles title and content input changes", () => {
    render(<EntryForm />);
    const titleInput = screen.getByPlaceholderText("Enter a title (optional)") as HTMLInputElement;
    const contentInput = screen.getByPlaceholderText("Write your entry here...") as HTMLTextAreaElement;
  
    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });
  
    expect(titleInput.value).toBe("Test Title");
    expect(contentInput.value).toBe("Test Content");
  });

  test("submits form and calls createEntry", async () => {
    render(<EntryForm />);
    const titleInput = screen.getByPlaceholderText("Enter a title (optional)");
    const contentInput = screen.getByPlaceholderText("Write your entry here...");
    const submitButton = screen.getByText("Create");

    fireEvent.change(titleInput, { target: { value: "Test Title" } });
    fireEvent.change(contentInput, { target: { value: "Test Content" } });
    fireEvent.click(submitButton);

    // Wait for the createEntry function to be called
    await waitFor(() => {
      expect(actions.createEntry).toHaveBeenCalledWith({
        title: "Test Title",
        content: "Test Content",
      });
    });
  });
});
