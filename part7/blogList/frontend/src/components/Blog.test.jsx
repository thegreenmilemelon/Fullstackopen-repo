import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import Blog from "./Blog";
import { expect, test } from "vitest";

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

test("renders blog title and author, but not URL and likes by default", async () => {
  const changeLike = vi.fn();
  const removeBlog = vi.fn();

  render(<Blog blog={blog} changeLike={changeLike} removeBlog={removeBlog} />);

  const element = screen.getByText("Test Blog John Doe");

  const urlElement = screen.queryByText("example.com");
  expect(urlElement).toBeNull();

  const likesElement = screen.queryByText("likes 10");
  expect(likesElement).toBeNull();

  expect(element).toBeDefined();
});

test("the url and number of likes are shown when the button controlling the shown details has been clicked", async () => {
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

test("if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const changeLike = vi.fn();
  const removeBlog = vi.fn();

  render(<Blog blog={blog} changeLike={changeLike} removeBlog={removeBlog} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);
  const likeButton = screen.getByText("like");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(changeLike.mock.calls).toHaveLength(2);
});
