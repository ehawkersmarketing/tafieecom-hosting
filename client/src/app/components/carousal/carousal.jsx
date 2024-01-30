import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductCard from "../productCard/productCard";

const CarouselCard = ({ cart, items }) => {
    return (
        <div>
            <div class='container-fluid' >
                <OwlCarousel items={4}
                    className="owl-theme"
                    loop
                    margin={6}
                    nav
                    dots={false}
                    autoplayTimeout={2000}
                    autoplayHoverPause={true}
                    navText={[
                        '<span class="arrow prev">‹</span>',
                        '<span class="arrow next">›</span>'
                    ]}
                    autoplay={true} >{items?.map((item, index) => {
                        return <ProductCard item={item} cart={cart} className='productItem' key={index} />
                    })}
                </OwlCarousel>
            </div>
        </div >
    );
}

export default CarouselCard;