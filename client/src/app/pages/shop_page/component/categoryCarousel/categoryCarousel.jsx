import React from 'react';
import './categoryCarousel.css';
import CategoryCard from "../categoryCard/categoryCard";

const CategoryCarousel = ({ items }) => {
    return (
        <div className='carousal'>
            <div className="categoryCarouselItems">
                {items?.map((item) => {
                    return (
                        <CategoryCard item={item} />
                    );
                })}
            </div>
        </div>
    )
}

export default CategoryCarousel;
