import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './createBlog.css';
import Header from "../../header/header";
import Footer from "../../footer/footer";

const CreateBlog = () => {
  const [inputHandler, setInputHandler] = useState({
    title: " ",
    content: " ",
    readingTime: " ",
  });
  const [image, setImage] = useState();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (user) {
      if (user.role.role === "Admin" || user.role.role === "Editor") {
        // navigate("blog/composeBlog");
      } else {
        navigate("/auth/login");
      }
    } else {
      navigate("/auth/login");
    }
  }, []);

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };
  const history = useNavigate();
  const backToDashboard = () => {
    history('/adminPage')
  }

  const addTags = event => {
    if (event.key === "Enter" && event.target.value !== "") {
      setTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  const removeTags = index => {
    setTags([...tags.filter(tag => tags.indexOf(tag) !== index)]);
  };


  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { title, content, readingTime } = inputHandler;
    if (title === " ") {
      alert("Add Title");
    } else if (content === " ") {
      alert(" Add Content");
    } else if (readingTime === " ") {
      alert(" Add reading time");
    } else if (!image) {
      alert(" Add Image");
    } else {
      const formData = new FormData();
      formData.append("image", image);

      const imageUrl = await axios.post(
        "http://localhost:8080/api/uploadBlogImage",
        formData
      );
      console.log(imageUrl);
      if (imageUrl) {
        if (imageUrl?.data.success) {
          const { data } = await axios.post(
            "http://localhost:8080/api/composeBlog",
            {
              title: title,
              content: content,
              readingTime: readingTime,
              image: imageUrl.data.url,
              tags: tags,
            }
          );
          if (data.success) {
            setInputHandler({
              ...inputHandler,
              title: " ",
              content: " ",
              readingTime: " ",
              image: "",
            });
            history("/adminPage");
          }
        }
      }
    }
  };

  return (
    <>
      <Header />
      <section>
        {
          <div className="form_data">
            <div className="cross" onClick={backToDashboard}>
              <i class="bi bi-file-x-fill"></i>
            </div>
            <div className="form_heading">
              <h1>Create Resource Center</h1>
            </div>

            <form>
              <div className="form_input">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  onChange={onChangeInputHandler}
                  value={inputHandler.title}
                  id="title"
                  name="title"
                  placeholder="Title"
                />
              </div>
              <div className="form_input">
                <label htmlFor="Content">Content</label>
                <textarea
                  style={{ width: "100%" }}
                  rows={10}
                  type="text"
                  onChange={onChangeInputHandler}
                  value={inputHandler.content}
                  id="content"
                  name="content"
                  placeholder="Content ...."
                />
              </div>
              <div className="form_input">
                <label htmlFor="readingTime">Estimate Reading Time</label>
                <input
                  type="readingTime"
                  onChange={onChangeInputHandler}
                  value={inputHandler.readingTime}
                  id="readingTime"
                  name="readingTime"
                  placeholder="readingTime"
                />
              </div>
              <div className="form_input">
                <label for="productImage">Resource Image</label>
                <input
                  type="file"
                  id="productImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="productImage"
                  required
                />
              </div>
              <div className="tags-input-container">
                {tags.map((tag, index) => (
                  <div className="tag-item" key={index}>
                    <span className="text">{tag}</span>
                    <span className="close" onClick={() => removeTags(index)}>&times;</span>
                  </div>
                ))}
                <input onKeyDown={event => addTags(event)} type="text" className="tags-input" placeholder="Please enter your tags here" />
              </div>
              <div
                className="btn"
                onClick={onSubmitHandler}
                style={{ backgroundColor: "#005C4B" }}
              >
                Create Resource Center
              </div>
            </form>
            {inputHandler.content.split("\n").map((item, index) => (
              <React.Fragment key={index}>
                {item}
                <br />
              </React.Fragment>
            ))}

          </div>
        }
      </section>
      <Footer />
    </>
  );
};

export default CreateBlog;
