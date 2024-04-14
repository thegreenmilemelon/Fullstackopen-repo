import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createComment } from "../reducers/commentReducer";

export default function AddComment() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const comment = event.target.comment.value;

    dispatch(createComment({ content: comment, id }));
    event.target.reset();
    console.log(comment);
  };

  return (
    <div>
      <h2>Add Comment</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="comment">Comment:</label>
        <input id="comment" name="comment"></input>
        <br />
        <button type="submit">Add Comment</button>
      </form>
    </div>
  );
}
