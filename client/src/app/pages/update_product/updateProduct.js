import react, { useState, useEffect } from "react";
import "../create_product/createProduct";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/api_hook";

const UpdateProduct = () => {
  const history = useNavigate();
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
  });

  const [dropdown, setDropdown] = useState({
    category: " ",
    gstSlab: " ",
  });

  const onDropdownChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setDropdown({ ...dropdown, [name]: value });
  };

  function limitInputValue(e) {
    if (e.target.value > maxValue) {
      <p>The Minimum value should be less than maximum value</p>;
    }
  }

  useEffect(() => {
    axios
      .patch("http://localhost:8080/api/updateProduct/" + id)
      .then((res) => {
        console.log(res.data.data.title);
        setInputHandler({
          ...inputHandler,
          title: res.data.data.title,
          description: res.data.data.description,
          price: res.data.data.price,
          quantity: res.data.data.quantity,
          UpdateProduct,
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
    const { category, gstSlab } = dropdown;
    const gstNumber = parseInt(gstSlab.split("%")[0]);
    e.preventDefault();
    axios
      .patch("http://localhost:8080/api/updateProduct/" + id, inputHandler)
      .then((res) => {
        console.log(res.data);
        history("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section>
      <div className="form_data">
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
            <input
              type="text"
              onChange={onChangeInputHandler}
              id="description"
              name="description"
              value={inputHandler.description}
              placeholder="description"
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
            <label htmlFor="gstSlab">GST SLAB</label>
            <br></br>
            <select
              style={{ width: "20rem", height: "2rem", marginBottom: "1rem" }}
              onChange={onDropdownChangeInputHandler}
              value={dropdown.gstSlab}
              name="gstSlab"
            >
              <option>select the GST</option>
              <option> 5%</option>
              <option>12%</option>
              <option>28%</option>
              <option>18%</option>
            </select>
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
  );
};

export default UpdateProduct;
