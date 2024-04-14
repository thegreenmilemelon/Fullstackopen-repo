import { createSlice } from "@reduxjs/toolkit";
import commentService from "../services/comments";
import { setBlogs } from "./blogReducer";

const commentSlice = createSlice({
  name: "comment",
  initialState: [],
  reducers: {
    setComment(state, action) {
      return action.payload;
    },
  },
});

export const { setComment } = commentSlice.actions;

export default commentSlice.reducer;

export const initializeComments = () => {
  return async (dispatch) => {
    const comments = await commentService.getAll();
    dispatch(setComment(comments));
    console.log("All comments", comments);
  };
};

export const createComment = (comment) => {
  return async (dispatch, getState) => {
    const newComment = await commentService.create(comment);
    const blogs = getState().blogs;
    const updatedBlogs = blogs.map((blog) => {
      if (blog.id === comment.id) {
        return {
          ...blog,
          comment: [...blog.comment, newComment],
        };
      }
      return blog;
    });

    dispatch(setBlogs(updatedBlogs));
  };
};
