import { useEffect, useState } from "react";
import react from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./resourceCenter";

const ResourceCenter = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/api/blogs")
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.data);
      })
      .catch((error) => {
        console.log("Error while fetching Blog");
        console.log(error);
      });
  }, []);

  const deleteHandler = (id) => {
    if (
      window.confirm("Do you want to delete the resource permently?") == true
    ) {
      axios
        .delete(`http://localhost:8080/api/deleteBlog/${id}`)
        .then((res) => {
          console.log("Blog deleted successfully");
          window.location.reload();
          setBlog((prevBlogs) => prevBlogs.filter((blog) => blog.id === id));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      console.log("Dont delete the Resource Center");
    }
  };
  const navigateToBlog = (event, id) => {
    event.preventDefault();
    navigate(`/resourceCenterDescription/${id}`);
  };

  return (
    <div>
      <div className="mx-auto mt-4 ">
        <div className="row">
          {blog?.map((blog) => (
            <div className="col-md-4 card-container">
              <div
                className="card content "
                style={{ width: "28rem", height: "8rem", marginTop: "1rem" }}
              >
                <div className="card-body text-center " key={blog._id}>
                  {console.log(blog)}
                  <img
                    src={blog.image}
                    style={{
                      width: "2rem",
                      height: "2rem",
                    }}
                    alt="img blog"
                  />
                  <h5
                    className="card-title "
                    onClick={(e) => navigateToBlog(e, blog._id)}
                  >
                    {blog.title}
                  </h5>
                  <p className="card-text">{blog.content}</p>
                  <p className="card-text">{blog.readingTime}</p>
                  <div className="btn-container">
                    <button className="btn comment">Comment</button>
                    {/* {rights.indexOf('edit-post') !== -1 && */}
                    <Link className="btn" to={`/updateBlog/${blog._id}`}>
                      Edit
                    </Link>
                    {/* }    {rights.indexOf('delete-post') !== -1 && */}
                    <button
                      className="btn"
                      onClick={() => deleteHandler(blog._id)}
                    >
                      Delete
                    </button>
                    {/* } */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResourceCenter;
