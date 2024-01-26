import React from 'react';
import './categoryCarousel.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CategoryCard from "../categoryCard/categoryCard";

const CategoryCarousel = ({ items }) => {
    return (
        <div className='carousal'>
            <div class='container-fluid' >
                <OwlCarousel items={2.5}
                    className="owl-theme"
                    loop
                    margin={8}
                    autoplayTimeout={5000}
                    autoplayHoverPause={true}
                    autoplay={false} >{items?.map((item, index) => {
                        return (
                            <CategoryCard item={item} key={index} />
                        );
                    })}
                </OwlCarousel>
            </div>
        </div>
    )
}

export default CategoryCarousel;
