import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { likeBlog, initializeBlogs } from "../reducers/blogReducer";
import AddComment from "./AddComment";
import { useEffect } from "react";

export default function SingleBlogInfo() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const changeLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  if (!blog) {
    return <div>Blog not found</div>;
  }
  console.log("eachblog:", blog);
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

      <br />
      <AddComment />

      <h3>Comments</h3>
      <ul>
        {blog.comment.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
}
