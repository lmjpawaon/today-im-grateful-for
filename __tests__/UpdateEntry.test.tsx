import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import UpdateEntry from "../src/app/components/UpdateEntry/UpdateEntry";
import * as actions from "../src/app/actions";

jest.mock("../src/app/actions", () => ({
  ...jest.requireActual("../src/app/actions"),
  getSpecificEntry: jest.fn(),
  editEntry: jest.fn(),
}));

describe("UpdateEntry component", () => {
  const entryId = "1";
  const mockEntry = {
    id: entryId,
    title: "Existing Title",
    content: "Existing Content",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });


  test("handles title and content input changes", async () => {
    (actions.getSpecificEntry as jest.Mock).mockResolvedValue(mockEntry);

    render(<UpdateEntry params={{ id: entryId }} />);
    await waitFor(() => {
        // Assert that the form elements are present after the data is fetched
        expect(screen.getByPlaceholderText("Enter a title (optional)")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Write your entry here...")).toBeInTheDocument();
    });

    const titleInput = screen.getByPlaceholderText("Enter a title (optional)") as HTMLInputElement;
    const contentInput = screen.getByPlaceholderText("Write your entry here...") as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: "New Title" } });
    fireEvent.change(contentInput, { target: { value: "New Content" } });

    expect(titleInput.value).toBe("New Title");
    expect(contentInput.value).toBe("New Content");
  });

test("handles form submission", async () => {
  // Mock the getSpecificEntry action with resolved data
  (actions.getSpecificEntry as jest.Mock).mockResolvedValue(mockEntry);

  // Render the component
  render(<UpdateEntry params={{ id: entryId }} />);

  // Wait for the asynchronous call to complete and update the component
  await waitFor(() => {
    // Assert that the form elements are present after the data is fetched
    expect(screen.getByPlaceholderText("Enter a title (optional)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Write your entry here...")).toBeInTheDocument();
  });

  // Get input elements
  const titleInput = screen.getByPlaceholderText("Enter a title (optional)") as HTMLInputElement;
  const contentInput = screen.getByPlaceholderText("Write your entry here...") as HTMLTextAreaElement;
  const submitButton = screen.getByRole("button", { name: /Update/i });

  // Simulate user input
  fireEvent.change(titleInput, { target: { value: "New Title" } });
  fireEvent.change(contentInput, { target: { value: "New Content" } });
  fireEvent.click(submitButton);

  // Submit the form
  await act(async () => {
    expect(actions.editEntry).toHaveBeenCalledWith(entryId, {
      title: "New Title",
      content: "New Content",
    });
});
  
});

});
