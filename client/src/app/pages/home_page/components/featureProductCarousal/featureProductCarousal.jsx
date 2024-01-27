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
                    margin={5}

                    autoplayTimeout={5000}
                    navText={[
                        '<span class="arrow prev">‹</span>',
                        '<span class="arrow next">›</span>'
                    ]}
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