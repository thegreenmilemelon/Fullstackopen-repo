import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Blog from "./Blog";
import { expect } from "vitest";

test("renders blog title and author, but not URL and likes by default", async () => {
  const blog = {
    title: "Test Blog",
    author: "John Doe",
    url: "example.com",
    likes: 10,
    user: {
      username: "testuser",
      name: "Test User",
    },
  };

  const changeLike = vi.fn();
  const removeBlog = vi.fn();

  render(<Blog blog={blog} changeLike={changeLike} removeBlog={removeBlog} />);

  const element = screen.getByText("Test Blog John Doe");

  const urlElement = screen.queryByText("example.com");
  expect(urlElement).toBeNull();

  const likesElement = screen.queryByText("Likes: 10");
  expect(likesElement).toBeNull();

  expect(element).toBeDefined();
});
