import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import { useDispatch } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => setBlogs(initialBlogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");

      dispatch(
        setNotification({ text: "Login successful!", type: "success" }, 5)
      );
    } catch (exception) {
      dispatch(
        setNotification(
          { text: "Wrong username or password.", type: "error" },
          5
        )
      );
      console.log("failed to login");
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const returnedBlog = await blogService.create(blogObject);
    setBlogs(blogs.concat(returnedBlog));
    setMessage({
      text: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      type: "success",
    });
    setTimeout(() => {
      setMessage({ text: null, type: null });
    }, 5000);
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  );

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const changeLike = async (blog) => {
    const changedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
    });

    setBlogs(blogs.map((b) => (b.id === blog.id ? changedBlog : b)));
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      setMessage({ text: "Blog deleted successfully", type: "success" });
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
    } catch (error) {
      setMessage({ text: "Failed to delete blog", type: "error" });
      setTimeout(() => {
        setMessage({ text: null, type: null });
      }, 5000);
      console.error("Error deleting blog:", error);
    }
  };

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h1>Blogs</h1>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          Logged in as {user.username}.<br />
          <button onClick={logout}>Log out</button>
          <br />
          {blogForm()}
          {sortedBlogs.map((blog, i) => {
            return (
              <Blog
                key={i}
                blog={blog}
                changeLike={() => changeLike(blog)}
                removeBlog={removeBlog}
              />
            );
          })}
        </div>
      )}
      <h3>Blog app user</h3>
    </div>
  );
};

export default App;
