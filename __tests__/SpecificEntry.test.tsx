import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SpecificEntry from "../src/app/components/SpecificEntry/SpecificEntry";
import * as actions from "../src/app/actions";

jest.mock("../src/app/actions", () => ({
  ...jest.requireActual("../src/app/actions"),
  getSpecificEntry: jest.fn(),
  deleteEntry: jest.fn(),
}));

describe("SpecificEntry component", () => {
  const entryId = "1";
  const mockEntry = {
    id: entryId,
    title: "My Entry Title",
    content: "This is the content of my entry.",
    createdAt: "2023-10-27T00:00:00.000Z",
    modifiedAt: "2023-10-28T00:00:00.000Z",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Fetches and displays specific entry", async () => {
    (actions.getSpecificEntry as jest.Mock).mockResolvedValue([mockEntry]); // Wrap the entry in an array

    render(<SpecificEntry params={{ id: entryId }} />);

    await screen.findByText(mockEntry.title);
    expect(screen.getByText(mockEntry.content)).toBeInTheDocument();
    expect(screen.getByText(/created at/i)).toBeInTheDocument();
    expect(screen.getByText(/modified at/i)).toBeInTheDocument();
  });

test("Edit button links to correct URL", async () => {
    render(<SpecificEntry params={{ id: entryId }} />);
    
    await waitFor(() => {
      const editButton = screen.getByText("Edit");
      const linkElement = editButton.closest("a");
  
      expect(linkElement).toHaveAttribute("href", `/entry/${entryId}/edit`);
    });
  });

  test("Delete button triggers confirmation dialog", async () => {
    window.confirm = jest.fn().mockReturnValue(true);

    render(<SpecificEntry params={{ id: entryId }} />);

    await waitFor(() =>{
        const deleteButton = screen.getByRole("button", { name: /delete/i });
        fireEvent.click(deleteButton);
    })

    expect(window.confirm).toHaveBeenCalledWith("Are you sure you want to delete this entry?");
  });
});
