import React from "react";
import "./service.css";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import cardimg1 from "../../assets/services-card1.png";
import cardimg2 from "../../assets/services-card2.png";
import cardimg3 from "../../assets/services-card3.png";
import cardimg4 from "../../assets/services-card4.png";
import cardimg5 from "../../assets/services-card5.png";
import cardimg6 from "../../assets/services-card6.png";
import cardimg7 from "../../assets/services-card7.png";
import cardimg8 from "../../assets/services-card8.png";
import cardimg9 from "../../assets/services-card9.png";
import cardimg10 from "../../assets/services-card10.png";
import cardimg11 from "../../assets/services-card11.png";
import cardimg12 from "../../assets/services-card12.png";
import cardimg13 from "../../assets/services-card13.png";
import cardimg14 from "../../assets/services-card14.png";
import cardimg15 from "../../assets/services-card15.png";
import cardimg16 from "../../assets/services-card16.png";
import cardimg17 from "../../assets/services-card17.png";
import cardimg18 from "../../assets/services-card18.png";
import cardimg19 from "../../assets/services-card19.png";
import cardimg20 from "../../assets/services-card20.png";
import cardimg21 from "../../assets/services-card21.png";
import cardimg22 from "../../assets/services-card22.png";


const OurServices = () => {
  return (
    <>
      <Header />
      <div className="services">
        <div className="service-hero">
          <div className="service-div">
            <div className="service-image ">
              <div className="service-text">
                <h1>
                  <span>OUR</span> <span>SERVICES</span>
                </h1>
                <p>Define your agriculture in a whole different way</p>
                <a href="#cardsection">
                  Learn More <i class="bi bi-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="service-below-header">
            <div className="filter-region">
              <div className="all-services">
                <h3><b>
                  <span>ALL</span>
                  <span>SERVICES</span></b>
                </h3>
              </div>
              <div className="search-bar">
                <input
                  type="text"
                  id="text-blog"
                  name="search"
                  className="search_container"
                />
                <div className="search-button">
                  <button className="search-icon">
                    <i class="bi bi-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="services-card-outer" id="cardsection">
          <div className="services-card justify-content-around row">
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <div>
                  <h5>Poly House</h5>
                  <p>cultivation of high quality and exotic crops</p></div>
              </div>
              <div className="block-img col-5">
                <img src={cardimg1} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Shade Net House</h5>
                <p>Temperature-Controlled Cultivation</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg2} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Fan & Pad Poly House</h5>
                <p>Climate-Optimized Plantation</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg3} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Mist Chamber</h5>
                <p>Precision Propagation Hub</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg4} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Tissue Culture Laboratory</h5>
                <p>Advanced Genetic Propagation</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg5} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Hydroponic</h5>
                <p>Soilless Crop Farming</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg6} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Aeroponic</h5>
                <p>High-Efficiency Crop Cultivation</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg7} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Aquaponic</h5>
                <p>Integrated Fish and Crop Farming</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg8} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Fumigation</h5>
                <p>Precision Pest Control</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg9} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Nursery</h5>
                <p>Seedling Growth Hub</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg10} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Walk-In Tunnel</h5>
                <p>Protected Crop Environment</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg11} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Solar Dryer</h5>
                <p>Sun-Powered Drying Solution</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg12} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Warehouse</h5>
                <p>Strategic Storage Hub</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg13} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Cold Storage</h5>
                <p>Temperature-Controlled Preservation</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg14} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Pack House</h5>
                <p>Produce Sorting and Packing</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg15} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Cold Room</h5>
                <p>Chilled Storage Facility</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg16} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Goat Farming</h5>
                <p>Sustainable Livestock Operation</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg17} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Dairy Farming</h5>
                <p>Modern Dairy Production</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg18} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Fish Farming</h5>
                <p>Aquatic Cultivation System</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg19} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Food Processing</h5>
                <p>Innovative Culinary Solutions</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg20} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Market Linkag</h5>
                <p>Connecting Growers to Markets</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg21} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text col-7">
                <h5>Cluster Development</h5>
                <p>Integrated Agricultural Growth</p>
              </div>
              <div className="block-img col-5">
                <img src={cardimg22} alt="" />
              </div>
            </div>
            <div className="service-block col-3 d-flex">
              <div className="block-text-missing">
                <h5>Missing Something?</h5>
                <p>Tell us your requirements below.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default OurServices;
