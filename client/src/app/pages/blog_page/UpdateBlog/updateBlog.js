import react, { useState, useEffect } from "react";
import "../CreateBlog/createBlog";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../header/header";
import Footer from "../../footer/footer";
const UpdateBlog = () => {
  const history = useNavigate();
  const [image, setImage] = useState();
  const { id } = useParams();
  const [inputHandler, setInputHandler] = useState({
    id: id,
    title: "",
    content: "",
    readingTime: "",
  });

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user) {
      if (user.role.role === "Admin" || user.role.role === "Editor") {
        // history("/adminPage");
      } else {
        history("/auth/login");
      }
    } else {
      history("/auth/login");
    }
  }, []);

  const getOneBlog = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/blog/" + id);
      console.log(data);
      setInputHandler({
        title: data.data.title,
        content: data.data.content,
        readingTime: data.data.readingTime,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOneBlog();
  }, []);

  useEffect(() => {
    axios
      .put("http://localhost:8080/api/updateBlog/" + id)
      .then((res) => {
        console.log(res.data);
        setInputHandler({
          ...inputHandler,
          title: res.data.updatedBlog.title,
          content: res.data.updatedBlog.content,
          readingTime: res.data.updatedBlog.readingTime,
          image: res.data.updatedBlog.image,
          UpdateBlog,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const backToDashboard = () => {
    history("/adminPage");
  };

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    var imageUrl = await axios.post(
      "http://localhost:8080/api/uploadBlogImage",
      formData
    );
    console.log(imageUrl);
    if (imageUrl.data.success) {
      axios
        .put("http://localhost:8080/api/updateBlog/" + id, {
          title: inputHandler.title,
          content: inputHandler.content,
          readingTime: inputHandler.readingTime,
          image: imageUrl.data.url,
        })
        .then((res) => {
          console.log(res.data);
          history("/adminPage");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <Header />
      <section>
        <div className="form_data">
          <div className="cross" onClick={backToDashboard}>
            <i class="bi bi-file-x-fill"></i>
          </div>
          <div className="form_heading">
            <h1>Update Resource Center</h1>
          </div>

          <form>
            <div className="form_input">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                id="title"
                name="title"
                value={inputHandler.title}
                placeholder="Title"
              />
            </div>
            <div className="form_input">
              <label htmlFor="title">Content</label>
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
              <label htmlFor="readingTime"> Estimate Reading Time</label>
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
                // value={}
                onChange={(e) => setImage(e.target.files[0])}
                name="image"
                required
              />
            </div>
            <button className="btn" onClick={onSubmitHandler}>
              Update Resource Center
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UpdateBlog;
