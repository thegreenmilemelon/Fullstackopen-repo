import { useSelector } from "react-redux";

import Blog from "./Blog";

export default function BlogList({ loggedInUser }) {
  const blogs = useSelector((state) => state.blogs);
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

  if (blogs.length === 0) {
    return (
      <div>
        <h2>No blogs found</h2>
      </div>
    );
  }
  return (
    <div>
      {sortedBlogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}
