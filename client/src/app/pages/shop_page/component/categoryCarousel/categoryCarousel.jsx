import React ,{useState}from 'react';
import './categoryCarousel.css';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import CategoryCard from "../categoryCard/categoryCard";

const CategoryCarousel = ({ items ,  }) => {

    const [selectedCategory, setSelectedCategory] = useState('');

    const handleCallback = (item) => {
      console.log(item);
      setSelectedCategory(item)
      // Now you can use childData to filter your data
   }
    return (
        <div className='carousal'>
            <div class='container-fluid' >
                <OwlCarousel items={3}
                    className="owl-theme"
                    loop
                    nav
                    dots={false}
                    margin={3}
                    autoplayTimeout={2000}
                    navText={[
                        '<span class="arrow prev">‹</span>',
                        '<span class="arrow next">›</span>'
                    ]}
                    autoplayHoverPause={true}
                    autoplay={true} >{items?.map((item, index) => {
                        return (
                            <CategoryCard item={item} key={index} data={handleCallback}  />
                        );
                    })}
                </OwlCarousel>
            </div>
        </div>
    )
}

export default CategoryCarousel;
