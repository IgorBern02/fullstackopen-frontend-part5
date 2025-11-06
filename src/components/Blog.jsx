import { useState } from "react";

const Blog = ({ blog, onLike, onDelete, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle} className="blog">
      {blog.title}
      {blog.author}
      {visible === false && <button onClick={toggleVisibility}>view</button>}
      {visible === true && <button onClick={toggleVisibility}>hide</button>}

      {visible && (
        <>
          <div>
            <a href={blog.url}>{blog.url}</a>
            <p>
              likes <span id="likes">{blog.likes}</span>
              <button onClick={() => onLike(blog)}>like</button>
            </p>
          </div>
          {user && user.username === blog.user.username && (
            <button onClick={() => onDelete(blog)}>remove</button>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;
