import React from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import FeaturedProductCard from '../feature_product';

const FeatureCarouselCard = ({ items }) => {
    return (
        <div>
            <div class='container-fluid' >
                <OwlCarousel items={3}
                    className="owl-theme"
                    loop
                    nav
                    dots={false}
                    margin={5}
                    autoplayTimeout={5000}
                    navText={[
                        '<span class="arrow prev">‹</span>',
                        '<span class="arrow next">›</span>'
                    ]}
                    responsive={{
                        0: { // For mobile devices
                            items:  1,
                            navText: false,
                            // nav:false
                            
                        },
                        576:{
                            items:2,
                            navText:false,
                            // nav:false,
                        },
                        768: { // For tablets and small desktops
                            itemsText:  3,
                            navText:false,
                            // nav:false,
                            
                        },
                        922:{
                            itemsText:3,
                            navText:false,
                            // nav:false,
                        }
                    }}
                    autoplayHoverPause={true}
                    autoplay={false} >{items?.map((item) => {
                        return <FeaturedProductCard item={item} className='productItem' />
                    })}
                </OwlCarousel>
            </div>
        </div >
    );
}

export default FeatureCarouselCard;