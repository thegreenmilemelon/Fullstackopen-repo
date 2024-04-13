import { useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    const blog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    };
    dispatch(createBlog(blog));

    toggleVisibility();

    event.target.reset();
  };
  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title:</label>
        <input id="title" name="title" data-testid="title"></input>
        <br />
        <label htmlFor="author">Author:</label>
        <input id="author" name="author" data-testid="author"></input>
        <br />
        <label htmlFor="url">URL:</label>
        <input id="url" name="url" data-testid="url"></input>
        <br />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default BlogForm;
