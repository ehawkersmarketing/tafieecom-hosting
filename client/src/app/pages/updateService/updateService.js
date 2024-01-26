import react, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateService = () => {
  const history = useNavigate();

  const { id } = useParams();
  const [inputHandler, setInputHandler] = useState({
    id: id,
    title: "",
    description: "",
  });

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    if (user) {
      if (user.role.role === "Admin" || user.role.role === "Editor") {
        // history("/adminPage");
      } else {
      history("/auth/1");
      }
    }else {
      history("/auth/1");
    }
  }, []);

  const getOneService = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/getService/" + id);
      console.log(data.data[0].title);
      setInputHandler({
        title: data.data[0].title,
        description: data.data[0].description,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOneService();
  }, []);

  useEffect(() => {
    axios
      .put("http://localhost:8080/api/updateService/" + id)
      .then((res) => {
        console.log(res.data.data)
        setInputHandler({
          ...inputHandler,
          title: res.data.data.title,
          description: res.data.data.description,
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
      .put("http://localhost:8080/api/updateService/" + id, inputHandler)
      .then((res) => {
        console.log(res.data);
        history("/adminPage");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div className="form_data">
        <div className="form_heading">
          <h1>Update Service</h1>
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
            <label htmlFor="description">Description</label>
            <input
              type="text"
              onChange={onChangeInputHandler}
              id="description"
              name="description"
              value={inputHandler.description}
              placeholder="Description...."
            />
          </div>
          <button className="btn" onClick={onSubmitHandler}>
            Update service
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateService;
