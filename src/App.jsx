import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setSuccessMessage(
        `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`
      );
    } catch (error) {
      setErrorMessage("Error creating blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  return (
    <div>
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Login
            handleLogin={handleLogin}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>

          {successMessage && <div className="success">{successMessage}</div>}
          {errorMessage && <div className="error">{errorMessage}</div>}

          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>

          <div>
            <h2>create new</h2>
            <CreateBlog createBlog={addBlog} />
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
