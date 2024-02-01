import react, { useState, useEffect } from "react";
import "../create_product/createProduct";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/api_hook";
import Header from "../header/header";
import Footer from "../footer/footer";
const UpdateProduct = () => {
  const history = useNavigate();
  const [image, setImage] = useState();
  const { data } = useFetch("/api/allCategory");
  const [value, setValue] = useState(1);
  const [maxValue, setMaxValue] = useState(8);

  const { id } = useParams();
  const [inputHandler, setInputHandler] = useState({
    id: id,
    title: "",
    description: "",
    price: "",
    quantity: "",
    minQuantity: "",
    maxQuantity: "",
    weight:""
  });

  const [dropdown, setDropdown] = useState({
    category: "",
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

  const onDropdownChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setDropdown({ ...dropdown, [name]: value });
  };

  function limitInputValue(e) {
    if (parseInt(e.target.value) >= maxValue) {
      alert("The Minimum value should be less than maximum value");
    }
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/getProduct/" + id)
      .then((res) => {
        console.log(res.data.data.weight);
        setInputHandler({
          ...inputHandler,
          title: res.data.data.title,
          description: res.data.data.description,
          price: res.data.data.price,
          weight:res.data.data.weight,
          quantity: res.data.data.quantity,
          maxQuantity: res.data.data.units.maxQuantity,
          minQuantity: res.data.data.units.minQuantity,

        });
        setDropdown({
          category: res.data.data.category.category,
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
  const backToDashboard = () => {
    history("/adminPage");
  };

  const onSubmitHandler = async (e) => {
    const { category } = dropdown;
    e.preventDefault();
    let categoryList = data.filter((item) => item.category === category);

    const formData = new FormData();
    formData.append("image", image);

    const imageUrl = await axios.post(
      "http://localhost:8080/api/uploadImage",
      formData
    );

    if (imageUrl.data.success) {
      axios
        .patch("http://localhost:8080/api/updateProduct/" + id, {
          title: inputHandler.title,
          description: inputHandler.description,
          price: inputHandler.price,
          weight:inputHandler.weight,
          quantity: inputHandler.quantity,
          maxQuantity: inputHandler.maxQuantity,
          minQuantity: inputHandler.minQuantity,
          weight:inputHandler.weight,
          category: categoryList[0]._id,
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
            <h1>Update Product</h1>
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
                <label htmlFor="weight">Weight</label>
                <input
                  type="text"
                  onChange={onChangeInputHandler}
                  value={inputHandler.weight}
                  id="weight"
                  name="weight"
                  placeholder="weight"
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
              <label htmlFor="minQuantity">Minimum Quantity</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.minQuantity}
                id="minQuantity"
                name="minQuantity"
                onKeyDown={limitInputValue}
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
                  <option key={item.id} name="category" value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>
              ;
            </div>
            <button className="btn" onClick={onSubmitHandler}>
              Update Product
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default UpdateProduct;
