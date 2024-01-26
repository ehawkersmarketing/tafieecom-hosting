import React from "react";
import "./categoryCard.css";
const CategoryCard = ({ item }) => {
  return (
    <div key={item._id} className="categoryCarouselItem">
      <div className="service-block d-flex">
        <div className="block-text col-6">
          <div className="title-desc-card">
            <div>
              <h5>{item.category}</h5>
            </div>
          </div>
        </div>
        <div className="block-img col-6">
          <img src={item.categoryImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
