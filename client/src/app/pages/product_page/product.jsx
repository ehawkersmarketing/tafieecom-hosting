import react, { useEffect, useState } from "react";
import "./product.css";
import ProductImage from "../../assets/fertilizers.png";
import Carousal from "../../components/carousal/carousal";
import Header from "../../pages/header/header";

import Footer from "../footer/footer";

import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/api_hook";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import $ from "jquery";
const Product = () => {
  const { id } = useParams();
  const userUniqueId = localStorage.getItem("user_id")
  console.log(userUniqueId)
  const { data: product } = useFetch(`/api/getProduct/${id}`);
  const { data: allProducts } = useFetch("/api/allProducts");
  const { data: reviews, setData: setReviews } = useFetch(`/api/getReviewById/${id}`);
  const [inputHandler, setInputHandler] = useState({
    reviewContent: " ",
    rating: " ",
  });
  const navigate = useNavigate();
  const onChangeInputHandler = (e) => {
    const { name, value } = e.target;
    setInputHandler(() => {
      return { ...inputHandler, [name]: value };
    });
  };

  const [rated, setRated] = useState(0);

  const fetchReviews = async () => {
    const { data } = await axios.get(`http://localhost:8080/api/getReviewById/${id}`);
    setReviews(data.data);
  }

  const ReviewAddHandler = async (e) => {
    e.preventDefault();

    const { reviewContent, rating } = inputHandler;

    const { data } = await axios.post("http://localhost:8080/api/addReview", {
      reviewContent: reviewContent,
      rating: rated,
      productId: id,
      userId: userUniqueId
    });
    if (data.success) {
      fetchReviews();
      setInputHandler({
        ...inputHandler,
        reviewContent: " ",
        rating: " ",
      });
    }
  }

  $(document).ready(function () {
    var list = $(".list li");
    var numToShow = 3;
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


  return (
    <><Header />
      <div className="single-product bg">
        <div className="product-bg">
          <div className="wrapper">
            <div className="container">
              <div className="inner-container row">
                <div className="product-image col-7">
                  <img src={product?.image} />
                </div>
                <card className="card card-design col-5">
                  <div className="inner-card">
                    <h3 className="category-name">
                      {product?.category?.category}
                    </h3>
                    <h1 className="product-name">{product?.title}</h1>
                    <div className="ratingAndReview">
                      <ul class="rating">
                        {Array.apply(null, { length: 5 }).map(
                          (e, i) => (
                            <li>
                              <i class={i >= product?.rating ? `bi bi-star` : `bi bi-star-fill`} id="review-icon"></i>
                            </li>
                          )
                        )}
                      </ul>
                      <span className="review">{product?.reviews} Reviews</span>
                    </div>
                    <div className="price">Rs.{product?.price} /-</div>
                    <div className="wishlistAndAddCart">
                      <button className="cart-btn">Add to Cart</button>

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
                {allProducts && <Carousal items={allProducts} />}
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
                <button className="review-btn">0</button>
              </sup>
             
              </div>
              <div className="ratingAndReview">
                <ul class="rating">
                  {Array.apply(null, { length: 5 }).map(
                    (e, i) => (
                      <li>
                        <i class={i >= rated ? `bi bi-star` : `bi bi-star-fill`} id="review-icon" onClick={() => setRated(i+1)}></i>
                      </li>
                    )
                  )}
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
              <ul className="list">
                {reviews?.reviews.map((item) => {
                  return (
                    <li>
                      <div className="user-review">
                        <div className="user-main-review">
                          <span className="user-icon">
                            <i class="bi bi-person-circle"></i>
                          </span>
                          <h3 className="personName">{item.userId.userName}</h3>
                        </div>
                        <p>{item.review}</p>
                        {/* <span> {Array.apply(null, { length: 5 }).map(
                          (e, i) => (
                            <li>
                              <i class={i >= item?.rating ? `bi bi-star` : `bi bi-star-fill`} id="review-icon"></i>
                            </li>
                          )
                        )}</span> */}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <button className="load-more" id="next">
                Load More<i class="bi bi-chevron-down"></i>{" "}
              </button>
            </div>
          </div>
        </div>
      </div>


      <Footer />
    </>
  );

};

export default Product;
