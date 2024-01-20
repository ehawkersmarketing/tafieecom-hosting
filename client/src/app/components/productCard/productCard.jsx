import React from 'react';
import './productCard.css';

const ProductCard = ({ item }) => {

    return (
        <div key={item.id} className="carouselItem" interval="500">
            <div className="textBlock">
                <img className='product-image' src={item.image} alt="" />
                <div className='text-fields'>
                    <h3 className='category-name'>Fertizers</h3>
                    <h1 className='product-name'>19:19:19 Water Soluble Fertilizer</h1>
                    <div className="ratingAndReview">
                        <ul class="rating">
                            <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                            <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                            <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                            <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                            <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                        </ul>
                        <span className='review'>345 Reviews</span>
                    </div>
                    <div className="price">
                        Rs.300/-
                    </div>
                    <button className='cart-btn'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
