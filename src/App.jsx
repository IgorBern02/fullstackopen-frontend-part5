import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import loginService from "./services/login,";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
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

  return (
    <div>
      {user === null ? (
        <>
          <h2>log in to application</h2>
          <Login
            username={username}
            password={password}
            handleLogin={handleLogin}
          />
        </>
      ) : (
        <>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
