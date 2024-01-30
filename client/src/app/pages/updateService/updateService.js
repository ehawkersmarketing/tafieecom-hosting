import react, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
const UpdateService = () => {
  const history = useNavigate();
  let [image, setImage] = useState();
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
        history("/auth/login");
      }
    } else {
      history("/auth/login");
    }
  }, []);

  const getOneService = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8080/api/getService/" + id
      );
      console.log(data.data[0].image);
      setInputHandler({
        title: data.data[0].title,
        description: data.data[0].description,
      });
      setImage(data.data[0].image);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOneService();
  }, []);
  let decodedFileName;
  useEffect(() => {
    axios
      .put("http://localhost:8080/api/updateService/" + id)
      .then((res) => {
        console.log(res.data.data.image);

        if (typeof res.data.data.image === "string") {
          try {
            let parsedUrl = new URL(res.data.data.image);
            let pathSegments = parsedUrl.pathname.split("/");
            let fileName = pathSegments[pathSegments.length - 1];
            decodedFileName = decodeURIComponent(fileName);
            console.log(decodedFileName);
          } catch (error) {
            console.error("Invalid URL:", inputHandler.image);
          }
        } else {
          console.error("Expected a string, got:", typeof inputHandler.image);
        }
        setInputHandler({
          ...inputHandler,
          title: res.data.data.title,
          description: res.data.data.description,
          image: decodedFileName,
        });
        console.log(decodedFileName);
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

  const backToDashboard = () => {
    history("/adminPage");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const imageUrl = await axios.post(
      "http://localhost:8080/api/uploadServiceImage",
      formData
    );
    if (imageUrl.data.success) {
      axios
        .put("http://localhost:8080/api/updateService/" + id, {
          title: inputHandler.title,
          description: inputHandler.description,
          image: imageUrl.data.url,
          updatedImageUrl: imageUrl.data,
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
              <textarea
                style={{ width: "100%" }}
                rows={10}
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.description}
                id="description"
                name="description"
                placeholder="Description"
              />
            </div>
            <div className="form_input">
              <label for="serviceImage">Service Image</label>
              <input
                type="file"
                id="serviceImage"
                // value={image}
                onChange={(e) => setImage(e.target.files[0])}
                name="serviceImage"
                required
              />
            </div>
            <button className="btn" onClick={onSubmitHandler}>
              Update service
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UpdateService;
