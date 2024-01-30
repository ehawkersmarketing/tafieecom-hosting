import React, { useState, useEffect } from "react";
import "./service.css";
import { Link } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import Service_pop from "../../components/service_pop/Service_pop";
import { useFetch } from "../../hooks/api_hook";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OurServices = () => {
  const [searchField, setSearchField] = useState("");
  const { data: services } = useFetch("/api/getAllService");
  const [searchService, setSearchService] = useState(undefined);
  const [openIndex, setIndex] = useState(0);
  const navigate = useNavigate();

  const search = async (text) => {
    if (text !== "") {
      const { data } = await axios.post(
        `http://localhost:8080/api/searchService`,
        {
          search: text,
        }
      );
      setSearchService(data.data);
    } else {
      setIndex(0);
      setSearchService(undefined);
    }
  };

  useEffect(() => {
    search(searchField);
  }, [searchField]);

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
                <a href="#allservice">Learn More</a>
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
                  onChange={(e) => setSearchField(e.target.value)}
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
        <div className="services-card-outer" id="allservice">
          <div className="services-card row">
            {searchField !== "" && (
              <div className="blog-latest-post">
                <div>
                  <h4>Search Posts</h4>
                </div>
                <div className="below-line">
                  <div className="below-post"></div>
                  <div className="below-post-1"></div>
                </div>
                <div className="latest-post-card row">
                  {searchService && searchService.length !== 0 ? (
                    searchService?.map((service, index) => {
                      return (
                        <>
                          <div className="col-4" key={index}>
                            <div className="service-block d-flex">
                              <div className="block-text col-7">
                                <div>
                                  <h5>
                                    <button
                                      type="button"
                                      class="card-button"
                                      data-bs-toggle="modal"
                                      onClick={() => setIndex(index)}
                                      data-bs-target="#service-about"
                                    >
                                      {service.title}
                                    </button>
                                  </h5>
                                  <p>{service.description.substring(0, 40)}...</p>
                                </div>
                              </div>
                              <div className="block-img col-5">
                                <img src={service.image} alt="" />
                              </div>
                            </div>
                          </div>
                          
                        </>
                      );
                    })
                  ) : (
                    <div>
                      <h4>No Results Found</h4>
                    </div>
                  )}
                  
                </div>
              </div>
            )}

            {services &&
              searchField === "" &&
              services.map((service, index) => {
                return (
                  <div className="col-4" key={index}>
                    <div className="service-block d-flex">
                      <div className="block-text col-7">
                        <div>
                          <h5>
                            <button
                              type="button"
                              class="card-button"
                              data-bs-toggle="modal"
                              onClick={() => setIndex(index)}
                              data-bs-target="#service-about"
                            >
                              {service.title}
                            </button>
                          </h5>
                          <p>{service.description.substring(0, 40)}...</p>
                        </div>
                      </div>
                      <div className="block-img col-5">
                        <img src={service.image} alt="" />
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="col-4 missing-card">
              <div className="service-block d-flex">
                <div className="block-text">
                  
                    <h5>
                    <button type="button" class="card-button" onClick={() => window.location.hash = "#bottom"}>Missing something?</button>

                    </h5>
                    <p>Tell us your requirements below</p>
                  
                </div>
                
              </div>
            </div>

            {/* <--Modal--/> */}
            {services && (
              <div
                class="modal fade"
                id="service-about"
                tabindex="-1"
                aria-labelledby="servicemodalpop"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <div>
                        <h1 class="modal-title fs-5" id="servicemodalpop">
                          {searchField === ""
                            ? services[openIndex].title
                            : searchService &&
                              searchService.length > 0 &&
                              searchService[openIndex].title}
                        </h1>
                        {/* <p>{services[openIndex].description}</p> */}
                      </div>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <Service_pop
                        item={
                          searchField === ""
                            ? services[openIndex]
                            : searchService &&
                              searchService.length > 0 &&
                              searchService[openIndex]
                        }
                      />
                    </div>
                    <div class="modal-footer">
                      <div className="service-pop">
                        <button
                          className="d-flex"
                          type="button"
                          data-bs-dismiss="modal"
                        >
                          {" "}
                          <div>
                            <strong>Show Interest</strong>
                          </div>
                          <i class="bi bi-whatsapp"></i>
                        </button>
                      </div>
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default OurServices;
