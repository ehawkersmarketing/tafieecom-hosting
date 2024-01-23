import React from "react";
import "./allcategory.css";
import {Link} from "react-router-dom";
const AllCategoryComponent = () => {
  return (
    <>
      <div className="component-outer">
        <div className="component-main">
          <div className="main-head">
            <h4>
              <div>All Categories</div>
            </h4>
          </div>
          <div className="sub-head row">
            <div className="sub-head-product col-6">
              <h5>Products</h5>
              <div className="products">
                <Link >Smart Irrigation</Link>
                <Link >Greenhouse Accessories</Link>
                <Link >Pesticides</Link>
                <Link >Fertilizer</Link>
                <Link >Bio-Solution</Link>
                <Link >Seeds</Link>
                <Link >Plant/Seedlings</Link>
              </div>
            </div>
            <div className="sub-head-service col-6">
              <h5>Services</h5>
              <div className="services column">
                <Link >Agri Implements</Link>
                <Link >Gardening Tools</Link>
                <Link >Machinery</Link>
                <Link >Soilless Solution</Link>
                <Link >Solar Solution</Link>
                <Link >Hydroponics</Link>
                <Link >Vertical Farming</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllCategoryComponent;
