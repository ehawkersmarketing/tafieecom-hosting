import React from "react";
import "./featuredProductCard.css";
import { useNavigate } from "react-router-dom";

const FeaturedProductCard = ({ item }) => {
  const navigate = useNavigate();
  const knowmoreHandler = (id) => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    navigate(`/product/${id}`);
  };
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

    return (
        <div key={item._id} className="carouselItem" interval="500" >
            <div >
                <div className="feature-textBlock row justify-content-start" onClick={() => knowmoreHandler(item._id)}>
                    <div className='feature-text-fields col-7'>
                        <div className="names">
                            <h3 className='category-name'>{item.category.category}</h3>
                           <h1 className='product-name'>{item.title}</h1>
                        </div>
                        <div className="others">
                            <div className="ratingAndReview">
                            <ul class="rating">
                                {Array.apply(null, { length: 5 }).map(
                                    (e, i) => (
                                        <li>
                                            <i class={i >= item?.rating ? `bi bi-star` : `bi bi-star-fill`} id="review-icon"></i>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <button className='cart-btn' onClick={() => knowmoreHandler(item._id)}>Know More</button>
                        </div>
                        
                    </div>
                    <div className="carousel-image col-6" onClick={() => knowmoreHandler(item._id)}>
                        <img className='feature-product-image' src={item.image} alt="" />
                    </div>

                </div>
            </div>
            
        </div>
    )
}

export default FeaturedProductCard;