import react, { useState, useEffect } from "react";
import "../create_product/createProduct";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const history = useNavigate();

  const { id } = useParams();
  const [inputHandler, setInputHandler] = useState({
    id: id,
    title: "",
    description: "",  price:'' , quantity:'', productType:''
  });
  useEffect(() => {
    axios.patch("http://localhost:8080/api/updateProduct/" + id)
      .then((res) => {
        setInputHandler({
          ...inputHandler,
          title:res.data.updatedProduct.title,
          description: res.data.data,
          UpdateProduct
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.patch("http://localhost:8080/api/updateProduct/" + id, inputHandler)
      .then((res) =>  {console.log(res.data)
      history('/')})
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
              <label htmlFor="productType">Product Type</label>
              <input
                type="text"
                onChange={onChangeInputHandler}
                value={inputHandler.productType}
                id="productType"
                name="productType"
                placeholder="productType"
              />
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
