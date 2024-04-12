import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import { logout, setUser } from "./reducers/userReducer";
import storage from "./services/storage";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const loggedInUser = storage.loadUser();
    if (loggedInUser) {
      dispatch(setUser(loggedInUser));
    }
  }, [dispatch]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      dispatch(logout());
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        toggleVisibility={() => blogFormRef.current.toggleVisibility()}
      />
    </Togglable>
  );

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          Logged in as {user.username}.<br />
          <button onClick={handleLogout}>Log out</button>
          <br />
          {blogForm()}
          <BlogList />
        </div>
      )}
      <h3>Blog app user</h3>
    </div>
  );
};

export default App;
