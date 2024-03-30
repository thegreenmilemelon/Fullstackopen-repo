import { useState } from "react";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      {blog.title} {blog.author}{" "}
      <button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>likes {blog.likes}</p>
          <p>added by {blog.user.name}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
