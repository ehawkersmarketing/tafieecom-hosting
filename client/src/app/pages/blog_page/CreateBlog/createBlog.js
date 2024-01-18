import react, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlog = () => {
  const [inputHandler, setInputHandler] = useState({
    title: " ",
    content: " ",
    readingTime: " ",
  });
  const [image, setImage] = useState();

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };
  const history = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { title, content, readingTime } = inputHandler;
    if (title === " ") {
      alert("Add Title");
    } else if (content === " ") {
      alert(" Add Content");
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
            history("/resourceCenter");
          }
        }
      }
    }
  };

  return (
    <section>
      {
        <div className="form_data">
          <div className="form_heading">
            <h1>Create Blog</h1>
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
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.content}
                id="content"
                name="content"
                placeholder="Content ...."
              />
            </div>
            <div className="form_input">
              <label htmlFor="readingTime">Reading Time</label>
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

            <button className="btn" onClick={onSubmitHandler}>
              Create Blog
            </button>
          </form>
        </div>
      }
    </section>
  );
};

export default CreateBlog;
