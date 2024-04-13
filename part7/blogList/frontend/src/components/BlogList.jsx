import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import storage from "../services/storage";
export default function BlogList() {
  const blogs = useSelector((state) => state.blogs);

  const currentUser = storage.me();

  const sortedBlogs = [...blogs]
    .filter((blog) => blog.user.username === currentUser)
    .sort((a, b) => b.likes - a.likes);

  if (sortedBlogs.length === 0) {
    return (
      <div>
        <p>Blogs Pending...</p>
      </div>
    );
  }
  return (
    <div>
      {sortedBlogs.map((blog) => (
        <div key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
}
