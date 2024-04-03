import { useState } from "react";
import PropTypes from "prop-types";
import storage from "../services/storage";

const Blog = ({ blog, changeLike, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const blogBelongsToUser = blog.user
    ? blog.user.username === storage.me()
    : true;

  console.log("Storage:", blog.user, storage.me(), blogBelongsToUser);

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div className="detail">
      {blog.title} {blog.author}{" "}
      <button onClick={toggleDetails} data-testid="view">
        {showDetails ? "hide" : "view"}
      </button>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes}{" "}
            <button onClick={changeLike} data-testid="like">
              like
            </button>
          </p>
          <p>added by {blog.user.name}</p>
          {blogBelongsToUser && (
            <button onClick={handleRemoveBlog} data-testid="remove">
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  changeLike: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  user: PropTypes.object,
};

export default Blog;
