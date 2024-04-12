import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, addBlog } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blogObject);
    dispatch(addBlog(newBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    await blogService.remove(id);
    const blogs = getState().blogs.filter((blog) => blog.id !== id);
    dispatch(setBlogs(blogs));
  };
};

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    const changedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user,
    });
    const blogs = getState().blogs.map((b) =>
      b.id === blog.id ? changedBlog : b
    );
    dispatch(setBlogs(blogs));
  };
};

export default blogSlice.reducer;
