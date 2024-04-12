import { useState, useEffect } from "react";
import storage from "../services/storage";
import { removeBlog, likeBlog } from "../reducers/blogReducer";
import { useDispatch } from "react-redux";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const blogBelongsToUser = blog.user
    ? blog.user.username === storage.me()
    : true;

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      console.log("Removing blog", blog.id);
      dispatch(removeBlog(blog.id));
    }
  };

  const changeLike = () => {
    dispatch(likeBlog(blog));
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

export default Blog;
