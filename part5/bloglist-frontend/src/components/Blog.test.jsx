import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Blog from "./Blog";
import { expect, test } from "vitest";

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

//Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.

test("the url and number of likes are shown when the button controlling the shown details has been clicked", async () => {
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

  const user = userEvent.setup();

  const button = screen.getByText("view");
  await user.click(button);
  const urlElement = screen.getByText("example.com");
  expect(urlElement).toBeDefined();
  const likesElement = screen.getByText("likes 10");
  expect(likesElement).toBeDefined();
});
