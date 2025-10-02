import { useState } from "react";

const Blog = ({ blog }) => {
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
    <div style={blogStyle}>
      {blog.title}

      {visible === false && <button onClick={toggleVisibility}>view</button>}
      {visible === true && <button onClick={toggleVisibility}>hide</button>}

      {visible && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <p>
            {blog.likes} likes <button>like</button>
          </p>
          <p>added by {blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
