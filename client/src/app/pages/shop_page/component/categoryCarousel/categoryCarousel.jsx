import React from 'react';
import './categoryCarousel.css';
import CategoryCard from "../categoryCard/categoryCard";

const CategoryCarousel = ({ items }) => {
    return (
        <div className='carousal'>
            <div className="categoryCarouselItems">
                {items?.map((item, index) => {
                    return (
                        <CategoryCard item={item} key={index} />
                    );
                })}
            </div>
        </div>
    )
}

export default CategoryCarousel;
