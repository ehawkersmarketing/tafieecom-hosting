import { useState, useEffect } from "react";
import "./product.css";
// import ProductImage from "../../assets/fertilizers.png";
import Carousal from "../../components/carousal/carousal";
import Header from "../../pages/header/header";

import Footer from "../footer/footer";

import { useParams, useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/api_hook";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import $ from "jquery";

const Product = () => {
  const { id } = useParams();
// console.log("id",id)
  const userUniqueId = localStorage.getItem("user_id");
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(userUniqueId);
  const { data: product } = useFetch(`/api/getProduct/${id}`);
  const { data: allProducts } = useFetch("/api/allProducts");
  const { data: reviews, setData: setReviews } = useFetch(
    `/api/getReviewById/${id}`
  );
  // console.log(reviews?.reviews)
  const [error, setError] = useState(null);
  useEffect(() => {
    // Function to fetch order data from the backend

    const fetchProduct = async () => {
      try {        
          const response = await fetch("http://localhost:8080/api/getProduct/" + id);
          
          if (response) {
            const data = await response.json();
           console.log(data)
           if(data.success === false){
            console.log("navigate")
            navigate(`/shopPage`)
          }else if(data.success === true){
            if(data.data.user._id === user?._id){
              console.log("vkdvd")
            }else {
              console.log("go navigate")
              navigate(`/shopPage`);
            }
          } 
           
                   
          } else {
            throw new Error('Order not found');
          }
        
        }catch (error) {
          setError(error.message);
        }
      }
        
    fetchProduct(); 
    
  }, [id]);








  const [inputHandler, setInputHandler] = useState({
    reviewContent: " ",
    rating: " ",
  });
  const [rated, setRated] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
  const navigate = useNavigate();
  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };

  useEffect(() => {
    if (cart) {
      setInCart(
        cart?.products.find((product) => {
          return product?.productId?._id === id;
        })
      );
      setQuantity(
        cart?.products.find((product) => {
          return product?.productId?._id === id;
        })?.units
      );
    }
  }, [cart, id]);

  const onCartClick = async () => {
    try {
      if (localStorage.getItem("user_id")) {
        await axios.put("http://localhost:8080/api/addToCart", {
          productId: id,
          userId: localStorage.getItem("user_id"),
          units: 1,
        });
        navigate(`/Cart`);
      } else {
        toast.error("Please login to add this item to your cart", {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const fetchReviews = async () => {
    try {
      // console.log("Fetching reviews...");
      const response = await axios.get(`http://localhost:8080/api/getReviewById/${id}`);
      console.log("Reviews fetched:", response.data.data);
      if ( response.data.data.reviews) {
        setReviews(response.data.data.reviews);
      } else {
        console.error("No reviews found in the response.");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };
  const ReviewAddHandler = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You can't Add review  untill you are login");
    } else {
      const { reviewContent, rating } = inputHandler;

      const { data } = await axios.post("http://localhost:8080/api/addReview", {
        reviewContent: reviewContent,
        rating: rated,
        productId: id,
        userId: userUniqueId,
      });
      if (data.success) {
        setRated(0);
        setInputHandler({
          ...inputHandler,
          reviewContent: " ",
          rating: " ",
        });
        window.location.reload();
      }
    }
    fetchReviews();
  };

  $(document).ready(function () {
    var list = $(".list");
    var numToShow = 4;
    var button = $("#next");
    var numInList = list.length;
    list.hide();
    if (numInList > numToShow) {
      button.show();
    }
    list.slice(0, numToShow).show();

    button.click(function () {
      var showing = list.filter(":visible").length;
      list.slice(showing - 1, showing + numToShow).fadeIn();
      var nowShowing = list.filter(":visible").length;
      if (nowShowing >= numInList) {
        button.hide();
      }
    });
  });

  const increaseValueHandler = async () => {
    try {
      if (quantity === product.units.maxQuantity) {
        toast.error(`You have reached product max limit`, {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        const { data } = await axios.put(
          `http://localhost:8080/api/addToCart`,
          {
            userId: user._id,
            productId: id,
            units: 1,
          }
        );
        if (data.success) {
          setQuantity(quantity + 1);
        } else {
          toast.error(`${data.message}`, {
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const decreaseValueHandler = async () => {
    try {
      const { data } = await axios.delete(
        `http://localhost:8080/api/dropFromCart/${user._id}/${id}`
      );
      if (data.success) {
        if (quantity != 1) {
          setQuantity(quantity - 1);
        } else {
          setInCart(false);
        }
      } else {
        toast.error(`${data.message}`, {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  return (
    <>
      <Header />
      <div className="single-product bg">
        <div className="product-bg">
          <div className="wrapper">
            <div className="container">
              <div className="inner-container row">
                <div className="product-image col-7">
                  <img src={product?.image} alt="product-img" />
                </div>
                <card className="card card-design col-5">
                  <div className="inner-card">
                    <h3 className="category-name">
                      {product?.category?.category}
                    </h3>
                    <h1 className="product-name">{product?.title}</h1>
                    <div className="ratingAndReview">
                      <ul class="rating">
                        {Array.apply(null, { length: 5 }).map((e, i) => (
                          <li>
                            <i
                              class={
                                i >= product?.rating
                                  ? `bi bi-star`
                                  : `bi bi-star-fill`
                              }
                              id="review-icon"
                            ></i>
                          </li>
                        ))}
                      </ul>
                      <span className="review">{product?.reviews} Reviews</span>
                    </div>
                    <div className="price">Rs.{product?.price} /-</div>
                    <div className="wishlistAndAddCart">
                      {inCart ? (
                        <div>
                          <button
                            class="minus"
                            onClick={(e) => decreaseValueHandler()}
                          >
                            -
                          </button>
                          <span id="number">{quantity}</span>
                          <button
                            class="plus"
                            onClick={(e) => increaseValueHandler()}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="cart-btn"
                          onClick={(e) => onCartClick()}
                        >
                          Add To Cart
                        </button>
                      )}
                    </div>
                  </div>
                </card>
              </div>
            </div>
          </div>
          <div className="wrapper-about">
            <div className="about-product">
              <h1 className="about-title">About Product</h1>
              <div className="about-desc">
                <p className="description">{product?.description}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-product-wrapper">
          <div className="carousel-card">
            <div className="single-carousel-card">
              <div className="card-carousel-title">
                <h2 className="recommended">Recommended</h2>
                <h2 className="foryou">For You</h2>
              </div>
              <div className="product-page-carousal">
                {allProducts && cart && (
                  <Carousal items={allProducts} cart={cart} />
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="review-section ">
          <div className="review-card card">
            <div className="review-heading">
              <div className="review-main-title">
                <h1 className="review-title">Reviews</h1>

                <sup>
                  <button className="review-btn">{product?.reviews}</button>
                </sup>
              </div>
              <div className="ratingAndReview">
                <ul class="rating">
                  {Array.apply(null, { length: 5 }).map((e, i) => (
                    <li>
                      <i
                        class={i >= rated ? `bi bi-star` : `bi bi-star-fill`}
                        id="review-icon"
                        onClick={() => setRated(i + 1)}
                      ></i>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="input-form">
              <div>
                <textarea
                  type="message"
                  className="input"
                  name="reviewContent"
                  onChange={onChangeInputHandler}
                  value={inputHandler.reviewContent}
                  placeholder="Hey! @name, it’s a very good design.🔥"
                />
              </div>
              <div>
                <button className="send" onClick={ReviewAddHandler}>
                  Send
                </button>
              </div>
            </div>
            <div className="review-description">
              <div className="list">
          
                {reviews?.reviews?.map((item) => {
                  return (
                    <li className="list">
                      <div className="user-review">
                        <div className="user-main-review">
                          <span className="user-icon">
                            <i class="bi bi-person-circle"></i>
                          </span>
                          <h3 className="personName">
                            {item?.userId?.userName}
                          </h3>
                        </div>
                        <ul className="rating">
                          {Array.apply(null, { length: 5 }).map((e, i) => (
                            <li>
                              <i
                                class={
                                  i >= item?.rating
                                    ? `bi bi-star`
                                    : `bi bi-star-fill`
                                }
                                id="review-icon"
                              ></i>
                            </li>
                          ))}
                        </ul>
                        <p>{item?.review}</p>
                      </div>
                    </li>
                  );
                })}
              </div>
              {product && product?.reviews > 3 && (
                <button className="load-more" id="next">
                  Load More<i className="bi bi-chevron-down"></i>
                </button>)}
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Product;
