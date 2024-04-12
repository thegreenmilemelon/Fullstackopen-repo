import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";

import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import BlogList from "./components/BlogList";
import storage from "./services/storage";

const App = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);

  useEffect(() => {
    const user = storage.loadUser();
    if (user) {
      setUser(user);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      storage.saveUser(user);
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
          <button onClick={logout}>Log out</button>
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
