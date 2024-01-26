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
              <div className="products-comp">
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
              <div className="services-comp">
                <Link to="/services">Agri Implements</Link>
                <Link to="/services">Gardening Tools</Link>
                <Link to="/services">Machinery</Link>
                <Link to="/services">Soilless Solution</Link>
                <Link to="/services">Solar Solution</Link>
                <Link to="/services">Hydroponics</Link>
                <Link to="/services">Vertical Farming</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllCategoryComponent;
