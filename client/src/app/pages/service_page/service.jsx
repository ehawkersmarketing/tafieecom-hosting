import React from "react";
import "./service.css";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import serviceback from "../../assets/ourservices-main.png";
import servicefront from "../../assets/ourservices-mask.png";
const OurServices = () => {
  return (
    <>
      <Header/>
      <div className="service-hero">
        <div className="service-div row">
          {/* <div className="blank col-7"></div>
            <div className="service-full-img col-5 row">
                <div className="service-content col-7">
                    <div className="our-services-text"></div>
                    <div className="our-services-desc"></div>
                    <div className="show-interest-btn"></div>
                </div>
                <div className="col-5"></div>
            </div> */}
          <div className="service-front-image col-7">
            <img src={servicefront} alt=""/>
          </div>
          <div className="service-back-image col-5">
        
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default OurServices;
