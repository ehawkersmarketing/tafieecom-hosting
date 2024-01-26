import React from "react";
import "./categoryCard.css";
const CategoryCard = ({ item }) => {
    return (
        <div key={item._id} className="categoryCarouselItem">
            <img src={item.categoryImg} alt="" />
        </div>
    )
}

export default CategoryCard;
