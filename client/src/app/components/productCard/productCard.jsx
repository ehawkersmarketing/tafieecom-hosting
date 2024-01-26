import React from "react";
import "./productCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const viewproductHandler = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div key={item._id} className="carouselItem" interval="500">
      <div className="textBlock">
        <div className="product-image">
          <img src={item.image} alt="" />
        </div>
        <div className="text-fields">
          <h3 className="category-name">{item.category.category}</h3>
          <h3
            className="product-name"
            onClick={() => viewproductHandler(item._id)}
          >
            {item.title}
          </h3>
          <div className="ratingAndReview">
            <div>
            <ul class="rating">
              {Array.apply(null, { length: item.rating }).map((e, i) => (
                <li>
                  <i class="bi bi-star-fill" id="review-icon"></i>
                </li>
              ))}
            </ul></div>
            <div className="review">345 Reviews</div>
          </div>
          <div className="price">{`Rs ${item.price}/-`}</div>
          <button className="cart-btn">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
