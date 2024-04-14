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
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SingleBlogInfo from "./components/SingleBlogInfo";

import {
  Container,
  Button,
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";

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
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box my={4}>{blogForm()}</Box>
      <Box my={4}>
        <BlogList />
      </Box>
    </Box>
  );

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/users">
            Users
          </Button>
          <Button color="inherit" component={Link} to="/blogs">
            Blogs
          </Button>
          {user ? (
            <Box display="flex" alignItems="center">
              <Typography variant="body1" color="inherit" mr={1}>
                {user.username} logged in
              </Typography>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
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
    </Container>
  );
};

export default App;
