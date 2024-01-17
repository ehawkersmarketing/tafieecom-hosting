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
        console.log("Error while fetching post");
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
          console.log("post deleted successfully");
          window.location.reload();
          setBlog((prevPosts) => prevPosts.filter((post) => post.id === id));
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
          {blog?.map((post) => (
            <div className="col-md-4 card-container">
              <div
                className="card content "
                style={{ width: "28rem", marginTop: "1rem" }}
              >
                <div className="card-body text-center " key={post._id}>
                  <h5
                    className="card-title "
                    onClick={(e) => navigateToBlog(e, post._id)}
                  >
                    {post.title}
                  </h5>
                  <p className="card-text">{post.content}</p>
                  <div className="btn-container">
                    <button className="btn comment">Comment</button>
                    {/* {rights.indexOf('edit-post') !== -1 && */}
                    <Link className="btn" to={`/updateBlog/${post._id}`}>
                      Edit
                    </Link>
                    {/* }    {rights.indexOf('delete-post') !== -1 && */}
                    <button
                      className="btn"
                      onClick={() => deleteHandler(post._id)}
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
