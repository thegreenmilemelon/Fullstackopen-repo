import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("form calls createBlog with correct details on submit", async () => {
  const mockCreateBlog = vi.fn();

  render(<BlogForm createBlog={mockCreateBlog} />);

  const titleInput = screen.getByLabelText("Title:");
  const authorInput = screen.getByLabelText("Author:");
  const urlInput = screen.getByLabelText("URL:");
  const submitButton = screen.getByText("Add Blog", { selector: "button" });

  await userEvent.type(titleInput, "My Awesome Blog");
  await userEvent.type(authorInput, "John Doe");
  await userEvent.type(urlInput, "example.com");

  // Submit the form
  await userEvent.click(submitButton);

  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: "My Awesome Blog",
    author: "John Doe",
    url: "example.com",
  });

  expect(mockCreateBlog.mock.calls).toHaveLength(1);

  console.log("mockCreateBlog calls:", mockCreateBlog.mock.calls);

  expect(mockCreateBlog.mock.calls[0][0].title).toBe("My Awesome Blog");
  expect(mockCreateBlog.mock.calls[0][0].author).toBe("John Doe");
  expect(mockCreateBlog.mock.calls[0][0].url).toBe("example.com");
});
