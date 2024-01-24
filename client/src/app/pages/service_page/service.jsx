import React from "react";
import "./service.css";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import cardimg1 from "../../assets/services-card1.png";
import cardimg2 from "../../assets/services-card2.png";
import cardimg3 from "../../assets/services-card3.png";
import cardimg4 from "../../assets/services-card4.png";
import Service_pop from "../../components/service_pop/Service_pop";

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
                <Link to="">
                  Learn More <i class="bi bi-whatsapp"></i>
                </Link>
              </div>
            </div>
          </div>
          <div className="service-below-header">
            <div className="filter-region">
              <div className="all-services">
                <h3>
                  <b>
                    <span>ALL</span>
                    <span>SERVICES</span>
                  </b>
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
        <div className="services-card-outer">
          <div className="services-card row">
            <div className="col-4">
              <div className="service-block d-flex">
                <div className="block-text col-7">
                  <div>
                    <h5><button type="button" class="card-button" data-bs-toggle="modal" data-bs-target="#service-about">Poly House</button></h5>
                    <p>cultivation of high quality and exotic crops</p>
                  </div>
                </div>
                <div className="block-img col-5">
                  <img src={cardimg1} alt="" />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="service-block d-flex">
                <div className="block-text col-7">
                  <div>
                    <h5><button type="button" class="card-button" data-bs-toggle="modal" data-bs-target="#service-about">Shade Net House</button></h5>
                    <p>Temperature-Controlled Cultivation</p>
                  </div>
                </div>
                <div className="block-img col-5">
                  <img src={cardimg2} alt="" />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="service-block d-flex">
                <div className="block-text col-7">
                  <div>
                    <h5><button type="button" class="card-button" data-bs-toggle="modal" data-bs-target="#service-about">Fan & Pad Poly House</button></h5>
                    <p>Climate-Optimized Plantation</p>
                  </div>
                </div>
                <div className="block-img col-5">
                  <img src={cardimg3} alt="" />
                </div>
              </div>
            </div>
            <div className="col-4">
              <div className="service-block d-flex">
                <div className="block-text col-7">
                  <div>
                    <h5><button type="button" class="card-button" data-bs-toggle="modal" data-bs-target="#service-about">Mist Chamber</button></h5>
                    <p>Precision Propagation Hub</p>
                  </div>
                </div>
                <div className="block-img col-5">
                  <img src={cardimg4} alt="" />
                </div>
              </div>
            </div>

            {/* <--Missing Something--/> */}

            <div className="col-4">
              <div className="service-block d-flex">
                <div className="block-text-missing">
                  <div>
                    <h5>Missing Something?</h5>
                    <p>Tell us your requirements below.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* <--Modal--/> */}
            <div class="modal fade" id="service-about" tabindex="-1" aria-labelledby="servicemodalpop" aria-hidden="true">
              <div class="modal-dialog modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <div>
                      <h1 class="modal-title fs-5" id="servicemodalpop">Poly House</h1>
                      <p>Cultivation of high quality and exotic crops</p>
                    </div>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <Service_pop />
                  </div>
                  <div class="modal-footer">
                    <div className='service-pop'>
                      <button className="d-flex" type="button" data-bs-dismiss="modal"> <div><strong>Show Interest</strong></div><i class="bi bi-whatsapp"></i></button>
                    </div>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>

                </div>
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
