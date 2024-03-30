import { useState } from "react";

const Blog = ({ blog, changeLike, removeBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const blogBelongsToUser =
    blog.user && user && blog.user.username === user.username;

  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  };

  return (
    <div>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={changeLike}>like</button>
          </p>
          <p>added by {blog.user.name}</p>
          {blogBelongsToUser && (
            <button onClick={handleRemoveBlog}>remove</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
