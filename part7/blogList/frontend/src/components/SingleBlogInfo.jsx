import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog } from "../reducers/blogReducer";

export default function SingleBlogInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const changeLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>By {blog.author}</p>
      <p>{blog.url}</p>
      <p>
        Likes: {blog.likes}{" "}
        <button onClick={() => changeLike(blog)}>like</button>
      </p>
      <p>Added by: {blog.user.username}</p>
    </div>
  );
}
