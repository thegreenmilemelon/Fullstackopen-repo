import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

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
    } catch (exception) {
      console.log("failed to login");
    }
  };

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title,
      author,
      url,
    };

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
    });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleURLChange = (event) => {
    setUrl(event.target.value);
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <label htmlFor="title">Title:</label>
      <input id="title" value={title} onChange={handleTitleChange}></input>
      <br />
      <label htmlFor="author">Author:</label>
      <input id="author" value={author} onChange={handleAuthorChange}></input>
      <br />
      <label htmlFor="url">URL:</label>
      <input id="url" value={url} onChange={handleURLChange}></input>
      <br />
      <button type="submit">Add Blog</button>
    </form>
  );

  return (
    <div>
      <h1>Blogs</h1>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          Logged in as {user.name}.<br />
          <button onClick={logout}>Log out</button>
          <br />
          {blogForm()}
          {blogs.map((blog, i) => {
            <Blog key={i} blog={blog} />;
          })}
        </div>
      )}
    </div>
  );
};

export default App;
