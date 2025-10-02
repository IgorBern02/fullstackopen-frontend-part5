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

  // const handleDelete = () => {
  //   if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
  //     onDelete(blog.id);
  //   }
  // };

  return (
    <div style={blogStyle}>
      {blog.title}

      {visible === false && <button onClick={toggleVisibility}>view</button>}
      {visible === true && <button onClick={toggleVisibility}>hide</button>}

      {visible && (
        <>
          <div>
            <a href={blog.url}>{blog.url}</a>
            <p>
              likes {blog.likes}
              <button onClick={() => onLike(blog)}>like</button>
            </p>
            <p>added by {blog.author}</p>
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
