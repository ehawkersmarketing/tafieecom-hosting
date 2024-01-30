import react, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";

const CreateService = () => {
  const [inputHandler, setInputHandler] = useState({
    title: " ",
    description: " ",
  });
  const [image, setImage] = useState();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const navigate = useNavigate();

  const backToDashboard = () => {
    history("/adminPage");
  };

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

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { title, description } = inputHandler;
    if (title === " ") {
      alert("Add Title");
    } else if (description === " ") {
      alert(" Add Description");
    } else if (!image) {
      alert("Add Image");
    } else {
      const formData = new FormData();
      formData.append("image", image);

      const imageUrl = await axios.post(
        "http://localhost:8080/api/uploadServiceImage",
        formData
      );
      console.log(imageUrl);
      if (imageUrl) {
        if (imageUrl?.data.success) {
          const { data } = await axios.post(
            "http://localhost:8080/api/createService",
            {
              title: title,
              description: description,
              image: imageUrl.data.url,
            }
          );
          if (data.success) {
            setInputHandler({
              ...inputHandler,
              title: " ",
              description: " ",
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
              <h1>Create Service</h1>
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
                <label htmlFor="Description">Description</label>
                <textarea
                  style={{ width: "100%" }}
                  rows={10}
                  type="text"
                  onChange={onChangeInputHandler}
                  value={inputHandler.description}
                  id="description"
                  name="description"
                  placeholder="Description ...."
                />
              </div>

              <div className="form_input">
                <label for="serviceImage">Service Image</label>
                <input
                  type="file"
                  id="serviceImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="serviceImage"
                  required
                />
              </div>

              <button
                className="btn"
                onClick={onSubmitHandler}
                style={{ backgroundColor: "#005C4B" }}
              >
                Create Service
              </button>
            </form>
          </div>
        }
      </section>
      <Footer />
    </>
  );
};

export default CreateService;
