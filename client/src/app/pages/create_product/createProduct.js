import react, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./createProduct.css";
import { useFetch } from "../../hooks/api_hook";
import axios from "axios";
import Header from "../header/header";
import Footer from "../footer/footer";

const CreateProduct = () => {
  const { data } = useFetch("/api/allCategory");
  // const user = JSON.parse(localStorage.getItem("user"));
  const [value, setValue] = useState(1);
  const [maxValue, setMaxValue] = useState(8);

  const [image, setImage] = useState();

  const [inputHandler, setInputHandler] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    productType: "",
    maxQuantity: maxValue,
    minQuantity: value,
  });
  const [dropdown, setDropdown] = useState({
    category: " ",
  });

  const history = useNavigate();

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

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    if (name == "minQuantity") {
      setValue(value);
    }
    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };

  const onDropdownChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setDropdown({ ...dropdown, [name]: value });
  };

  function limitInputValue(e) {
    if (parseInt(e.target.value) >= maxValue) {
      alert("The Minimum value should be less than maximum value");
    }
  }

  const backToDashboard = () => {
    history("/adminPage");
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const { title, description, maxQuantity, minQuantity, price, quantity } =
      inputHandler;
    const { category } = dropdown;
    const categoryList = data.filter((item) => item.category === category);
    console.log(categoryList);
    if (title === "") {
      alert("Add Title");
    } else if (description === "") {
      alert(" Add Description");
    } else if (quantity === "") {
      alert("Add Quantity");
    } else if (!image) {
      alert("Add image");
    } else if (price === "") {
      alert("Add Price");
    }
    if (!categoryList.length) {
      alert("Select category");
    } else {
      const formData = new FormData();
      formData.append("image", image);

      const imageUrl = await axios.post(
        "http://localhost:8080/api/uploadImage",
        formData
      );

      console.log(categoryList[0]._id);
      console.log(imageUrl);
      if (imageUrl?.data.success) {
        const { data } = await axios.post(
          "http://localhost:8080/api/createProduct",
          {
            title: title,
            description: description,
            units: {
              minQuantity: minQuantity,
              maxQuantity: maxQuantity,
            },

            price: price,
            quantity: quantity,
            category: categoryList[0]._id,
            image: imageUrl.data.url,
          }
        );
        console.log(data);
        if (data.success) {
          setInputHandler({
            ...inputHandler,
            title: " ",
            maxQuantity: " ",
            minQuantity: " ",
            description: " ",
            price: "",
            quantity: "",
          });
          setDropdown({ category: "" });
          history("/adminPage");
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
              <h1>Create Product</h1>
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
                  placeholder="Description"
                />
              </div>
              <div className="form_input">
                <label for="productImage">Product Image</label>
                <input
                  type="file"
                  id="productImage"
                  onChange={(e) => setImage(e.target.files[0])}
                  name="productImage"
                  required
                />
              </div>
              <div className="form_input">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  onChange={onChangeInputHandler}
                  value={inputHandler.price}
                  id="price"
                  name="price"
                  placeholder="Price"
                />
              </div>

              <div className="form_input">
                <label htmlFor="minQuantity">Minimum Quantity</label>
                <input
                  type="text"
                  onChange={onChangeInputHandler}
                  value={inputHandler.minQuantity}
                  id="minQuantity"
                  name="minQuantity"
                  onKeyUp={limitInputValue}
                  max="8"
                  placeholder="Minimum Quantity"
                />
                {value == 1 && <span>(Default)</span>}
              </div>
              <div className="form_input">
                <label htmlFor="maxQuantity">Maximum Quantity</label>
                <input
                  type="text"
                  onChange={onChangeInputHandler}
                  value={inputHandler.maxQuantity}
                  id="maxQuantity"
                  name="maxQuantity"
                  placeholder="8 (Default)"
                />
              </div>
              <div className="form_input">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="text"
                  onChange={onChangeInputHandler}
                  value={inputHandler.quantity}
                  id="quantity"
                  name="quantity"
                  placeholder="quantity"
                />
              </div>

              <div className="form_input">
                <label htmlFor="category">Category</label>
                <br></br>
                <select
                  onChange={onDropdownChangeInputHandler}
                  value={dropdown.category}
                  name="category"
                  style={{
                    width: "20rem",
                    height: "2rem",
                    marginBottom: "1rem",
                  }}
                >
                  <option>select the Category</option>
                  {data?.map((item) => (
                    <option
                      key={item._id}
                      name="category"
                      value={item.category}
                    >
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>

              <button className="btn" onClick={onSubmitHandler}>
                Create Product
              </button>
            </form>
          </div>
        }
      </section>
      <Footer />
    </>
  );
};

export default CreateProduct;
