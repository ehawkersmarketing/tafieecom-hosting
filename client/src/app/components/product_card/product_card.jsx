import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./post_card.css";
import { useFetch } from "../../hooks/api_hook";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductCard = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    let { data, setData } = useFetch("/api/getAllProducts");


    const handleBlogClick = (event, id) => {
        event.preventDefault();
        navigate(`/blogs/${id}`);
    };

    const addToCart = async (event, id) => {
        event.preventDefault();
        const res = await axios.post(`http://localhost:5000/api/addProduct/`, {
            userId: user.id,
            productId: id
        });
    };

    return (
        <div className="mx-auto mt-4 ">
            <div className="row">
                {data && data?.map((blog) => (
                    <div className="col-md-4 card-container" key={blog._id} >
                        <div
                            className="card content "
                            style={{ width: "25rem", marginTop: "1rem" }}>

                            <div className="card-body text-center ">
                                <h5 className="card-title " onClick={(e) => handleBlogClick(e, blog._id)}>{blog.title}</h5>
                                <p className="card-text" onClick={(e) => handleBlogClick(e, blog._id)}>{blog.description}</p>
                                <div className="btn-container">
                                    {user?.role && (user?.role.role !== "Viewer" || user?.userId == blog.userId) && (<button
                                        className="btn"
                                        onClick={(e) => addToCart(e, blog._id)}>
                                        Add To Cart
                                    </button>)}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div >
    );
};

export default ProductCard;
