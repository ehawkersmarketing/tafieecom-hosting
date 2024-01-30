import React from 'react';
import './featuredProductCard.css';
import { useNavigate } from 'react-router-dom';

const FeaturedProductCard = ({ item }) => {
    const navigate = useNavigate();
    const knowmoreHandler = (id) => {
        navigate(`/product/${id}`);
    }


    return (
        <div key={item._id} className="carouselItem" interval="500" >
            <div className="feature-textBlock row" onClick={() => knowmoreHandler(item._id)}>
                <div className='feature-text-fields col-6'>
                    <h3 className='category-name'>{item.category.category}</h3>
                    <h1 className='product-name'>{item.title}</h1>
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
                <div className="carousel-image col-6">
                    <img className='feature-product-image' src="https://s3-alpha-sig.figma.com/img/112a/fb05/4786abe7ca07fd72a9344eab27260568?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=jdMRIzJPqIL5w6qd2qHM0oRPKr7-89-o~Lb9h7w0tzw0IQMuqSdYnuzivz5RuUxY5VKP~S78XYPvhdOL-UhvyyvW4BKG5OXigHlwKHe4Ah-SnnEEo1wDGtJMLc0kLR0RsTYHn0LXdzDaVG97EQ4T3rnDeeEtl77zBZWJFNfK1dheWURLtVNBQWYCLIAVJrHQuFGHv0bG81wMjNr0SiKsk~wIHQ27i7VoV5h3JcVbzHjD4Rz3Kn1ma2uvBc0A33DqYE1y5cWM~knv4FbOJO2JS46fvMgEvHaNAhzf7FfoOPYBxA8LaRqenfB4FiLLN-S6vJUiKeI6dMlfRYyQYpMkuw__" alt="" />
                </div>

            </div>
        </div>
    )
}

export default FeaturedProductCard;
