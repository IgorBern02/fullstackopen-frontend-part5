import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginService from "./services/login,";
import CreateBlog from "./components/CreateBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

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

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   console.log("logging in with", username, password);
  //   try {
  //     const user = await loginService.login({
  //       username,
  //       password,
  //     });
  //     window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  //     blogService.setToken(user.token);
  //     setUsername("");
  //     setPassword("");
  //   } catch (exception) {
  //     console.log("wrong credentials");
  //   }
  // };

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

          <span>{user.name} logged in</span>
          <button onClick={handleLogout}>logout</button>

          <div>
            <h2>create new</h2>
            <CreateBlog createBlog={blogService.create} setBlogs={setBlogs} />
          </div>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
      {errorMessage && <div className="error">{errorMessage}</div>}
    </div>
  );
};

export default App;
