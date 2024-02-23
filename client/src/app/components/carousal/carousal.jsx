import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import ProductCard from "../productCard/productCard";

const CarouselCard = ({ cart, items }) => {
    return (
        <div>
            <div class='container-fluid' >
                <OwlCarousel
                    className="owl-theme"
                    loop
                    margin={6}
                    nav
                    dots={false}
                    responsive={{
                        0: { // For mobile devices
                            items:  1,
                        
                        },
                        576:{
                            items:2,
                        },
                        768: { // For tablets and small desktops
                            items:  3,
                            
                        },
                        992:{
                            items:4,
                        }
                    }}
                
                    autoplayTimeout={2000}
                    autoplayHoverPause={true}
                    navText={[
                        '<span class="arrow prev">‹</span>',
                        '<span class="arrow next">›</span>'
                    ]}
                    autoplay={false} >{items?.map((item, index) => {
                        return <ProductCard item={item} cart={cart} className='productItem' key={index} />
                    })}
                </OwlCarousel>
            </div>
        </div >
    );
}

export default CarouselCard;