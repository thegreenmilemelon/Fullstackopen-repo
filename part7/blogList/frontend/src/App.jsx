import { useState, useEffect, useRef } from "react";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";

import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import { logout, setUser } from "./reducers/userReducer";
import storage from "./services/storage";

import { initializeAllUsers } from "./reducers/allUsersReducer";
import UserInfo from "./components/UserInfo";
import { Routes, Route, Link, Navigate, useMatch } from "react-router-dom";
import Blog from "./components/Blog";
import SingleBlogInfo from "./components/SingleBlogInfo";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeAllUsers());
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

  const HomePage = () => (
    <div>
      {blogForm()}
      <BlogList />
    </div>
  );

  return (
    <div>
      <div>
        <Link style={{ marginRight: 10 }} to="/">
          Home
        </Link>
        <Link style={{ marginRight: 10 }} to="/users">
          Users
        </Link>
        <Link style={{ marginRight: 10 }} to="/blogs">
          Blogs
        </Link>
        {user ? (
          <p>
            {user.username} logged in{" "}
            <button onClick={handleLogout}>Logout</button>
          </p>
        ) : (
          <em>
            <Link to="/login">Login</Link>
          </em>
        )}
      </div>
      <Routes>
        <Route path="/blogs/:id" element={<SingleBlogInfo />} />
        <Route path="/" element={user ? <HomePage /> : loginForm()} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginForm />}
        />
        <Route path="/users/:id" element={<UserInfo />} />
      </Routes>
    </div>
  );
};

export default App;
