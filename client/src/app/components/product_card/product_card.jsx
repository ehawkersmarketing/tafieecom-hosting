import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./product_card.css";
import { useFetch } from "../../hooks/api_hook";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductCard = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const userId = localStorage.getItem('user_id');
    const { data } = useFetch("/api/allproducts");
    const token = localStorage.getItem("auth_token");

    const addToCart = async (event, id) => {
        event.preventDefault();
        const res = await axios.put(`http://localhost:8080/api/addToCart`, {
            userId: userId,
            productId: id,
            units: 1
        });
    };

    return (
        <div className="mx-auto mt-4 ">
            <div className="row">
                {data && data?.map((product) => {
                    console.log(product);
                    return (
                        <div className="col-md-4 card-container" key={product._id} >
                            <div
                                className="card content "
                                style={{ width: "25rem", marginTop: "1rem" }}>

                                <div className="card-body text-center ">
                                    <h5 className="card-title " >{product.title}</h5>
                                    <p className="card-text" >{product.description}</p>
                                    <div className="btn-container">
                                        {token && (<button
                                            className="btn"
                                            onClick={(e) => addToCart(e, product._id)}>
                                            Add To Cart
                                        </button>)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
};

export default ProductCard;
