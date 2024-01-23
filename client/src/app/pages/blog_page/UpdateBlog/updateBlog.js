import react, { useState, useEffect } from "react";
import "../CreateBlog/createBlog";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateBlog = () => {
  const history = useNavigate();

  const { id } = useParams();
  const [inputHandler, setInputHandler] = useState({
    id: id,
    title: "",
    content: "",
    readingTime: "",
  });

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
      .patch("http://localhost:8080/api/updateBlog/" + id)
      .then((res) => {
        setInputHandler({
          ...inputHandler,
          title: res.data.updatedBlog.title,
          content: res.data.updatedBlog.content,
          readingTime: res.data.updatedBlog.readingTime,
          UpdateBlog,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios
      .patch("http://localhost:8080/api/updateBlog/" + id, inputHandler)
      .then((res) => {
        console.log(res.data);
        history("/resourceCenter");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Edit Blog</h1>
        </div>

        <form>
          <div className="form_input">
            <label htmlFor="title">title</label>
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
            <input
              type="text"
              onChange={onChangeInputHandler}
              id="content"
              name="content"
              value={inputHandler.content}
              placeholder="Content"
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
          <button className="btn" onClick={onSubmitHandler}>
            Edit Blog
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateBlog;
