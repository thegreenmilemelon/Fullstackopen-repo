import { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title,
      author,
      url,
    });
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <div>
      <h2>Add Blog</h2>
      <form onSubmit={addBlog}>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          data-testid="title"
        ></input>
        <br />
        <label htmlFor="author">Author:</label>
        <input
          id="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          data-testid="author"
        ></input>
        <br />
        <label htmlFor="url">URL:</label>
        <input
          id="url"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          data-testid="url"
        ></input>
        <br />
        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
