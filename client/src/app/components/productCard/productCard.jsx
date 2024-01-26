import React from 'react';
import './productCard.css';

const ProductCard = ({ item }) => {

    return (
        <div key={item._id} className="carouselItem" interval="500" >
            <div className="textBlock">
                <img className='product-image' src={item.image} alt="" />
                <div className='text-fields'>
                    <h3 className='category-name'>{item.category.category}</h3>
                    <h1 className='product-name'>{item.title}</h1>
                    <div className="ratingAndReview">
                        <ul class="rating">
                            {
                                Array.apply(null, { length: item.rating }).map((e, i) => (
                                    <li><i class="bi bi-star-fill" id='review-icon'></i></li>
                                ))
                            }
                        </ul>
                        <span className='review'>345 Reviews</span>
                    </div>
                    <div className="price">
                        {`Rs ${item.price}/-`}
                    </div>
                    <button className='cart-btn'>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
