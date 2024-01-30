import React from "react";
import "./productCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ cart, item }) => {
  const navigate = useNavigate();

  const onCartTap = async (id, inCart) => {
    if (inCart) {
      navigate(`/Cart`);
    } else {
      await axios.put('http://localhost:8080/api/addToCart', {
        productId: id,
        userId: localStorage.getItem('user_id'),
        units: 1
      })
      navigate(`/Cart`);
    }
  };
  const inCart = cart?.products.find((product) => {
    return product.productId._id === item._id
  });

  const viewproductHandler = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div key={item._id} className="carouselItem col-3" interval="500">
      <div className="col-gapping" >
        <div className="textBlock">
          <div className="product-image" onClick={() => viewproductHandler(item._id)}>
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
                  {Array.apply(null, { length: 5 }).map(
                    (e, i) => (
                      <li>
                        <i class={i >= item.rating ? `bi bi-star` : `bi bi-star-fill`} id="review-icon"></i>
                      </li>
                    )
                  )}
                </ul></div>
              <div className="review">345 Reviews</div>
            </div>
            <div className="price">{`Rs ${item.price}/-`}</div>
            <button className='cart-btn' onClick={(e) => onCartTap(item._id, inCart)}>{
              inCart ? 'Update Cart' : 'Add To Cart'
            }</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProductCard;
