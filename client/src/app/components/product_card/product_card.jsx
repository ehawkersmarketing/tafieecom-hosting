import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./product_card.css";
import { useFetch } from "../../hooks/api_hook";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductCard = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const userId = localStorage.getItem("user_id");
  const { data } = useFetch("/api/allProducts");
  const token = localStorage.getItem("auth_token");

  const [value, setValue] = useState(0);
  const [image , setImage] = useState('https://www.ugaoo.com/cdn/shop/articles/shutterstock_301313486.jpg?v=1661870861&width=1100')
  const addToCart = async (event, id) => {
    event.preventDefault();
    const res = await axios.put(`http://localhost:8080/api/addToCart`, {
      userId: userId,
      productId: id,
      units: 1,
    });
    setValue(1);
  };
  return (
    <div className="mx-auto mt-4 ">
      <div className="row">
        {data &&
          data?.map((product) => {
            return (
              <div className="col-md-4 card-container" key={product._id}>
                <div
                  className="card content "
                  style={{ width: "25rem", marginTop: "1rem" }}
                >
                  <div className="card-body text-center ">
                  <img src={image} className="img" alt="no img" /> 
                    <h5 className="card-title ">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <div className="btn-container">
                      {token && (
                   <button
                        className="btn"
                        onClick={(e) => addToCart(e, product._id)}
                    >
                        Add To Cart
                    </button>)
                    }
                      {value === 1 && (
                        <span>
                          <button>-</button>
                          <span>0</span>
                          <button>+</button>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductCard;
