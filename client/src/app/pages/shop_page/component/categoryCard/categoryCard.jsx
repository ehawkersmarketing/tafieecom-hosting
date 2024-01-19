import React from 'react'
import "./categoryCard.css";
const CategoryCard = ({ item }) => {
    return (
        <div key={item.id} className="categoryCarouselItem">
            <img src={item.image} alt="" />
        </div>
    )
}

export default CategoryCard;