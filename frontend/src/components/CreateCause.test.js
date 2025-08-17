import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CreateCause from "./CreateCause";

// Fully mock axios to avoid ESM issues
const mockPost = jest.fn();

jest.mock("../axiosConfig", () => ({
  post: (...args) => mockPost(...args),
}));

describe("CreateCause Component", () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  test("renders form and submits successfully", async () => {
    // Mock API response
    mockPost.mockResolvedValue({ data: { id: 1, title: "Save the Rainforest" } });

    render(
      <MemoryRouter>
        <CreateCause />
      </MemoryRouter>
    );

    // Fill the form
    fireEvent.change(screen.getByPlaceholderText(/Cause Title/i), {
      target: { value: "Save the Rainforest" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: "Help us plant trees" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Target Amount/i), {
      target: { value: "1000" },
    });

    // Click submit
    fireEvent.click(screen.getByText(/Add Cause/i));

    // Wait for axios post to be called
    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith("/api/causes", {
        title: "Save the Rainforest",
        description: "Help us plant trees",
        targetAmount: 1000,
      });
    });
  });

  test("shows error message when API fails", async () => {
    mockPost.mockRejectedValue({ response: { data: { message: "Server error" } } });

    render(
      <MemoryRouter>
        <CreateCause />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText(/Cause Title/i), {
      target: { value: "Fail Cause" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Description/i), {
      target: { value: "This will fail" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Target Amount/i), {
      target: { value: "50" },
    });

    fireEvent.click(screen.getByText(/Add Cause/i));

    await waitFor(() => {
      expect(screen.getByText(/Server error/i)).toBeInTheDocument();
    });
  });
});
