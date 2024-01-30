import react from "react";
import "./exclusivestore.css";
import Header from "../header/header";
import img from "../../assets/image 2.png";
import sideImg from "../../assets/Group 358.png";
import lineImg from "../../assets/Line 13.png";
import mapImg from "../../assets/group-section-franchise.png";
import Footer from "../footer/footer";

const ExclusiveStore = () => {
  const footerHandler = () => {
    document.getElementById("bottom").scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className="franchise-wrapper">
        <Header />
        <div className="franchise-part">
          <div className="franchise-main-content">
            <div className="wrapper-row row">
              <div className="col-6 franchise-wrapper-content">
                <div className="main-content-page">
                  <div className="franchise-content-heading">
                    <h1 className="franchise-heading">PARTNER</h1>
                  </div>
                  <div className="franchise-content-para">
                    <h2 className="subheading-franchise">With TAFI Today!</h2>
                  </div>
                  <button
                    className="franchise-content-para-bt"
                    onClick={footerHandler}
                  >
                    <h5 className="h5-btn">Unlock Your Potential with</h5>
                    <p style={{ marginBottom: "0px", fontSize: "20px" }}>
                      <b> कृषक वाटिका</b>
                    </p>
                  </button>
                </div>
              </div>
              <div className="col-6 card-img-franchise">
                <div className="franchise-img-card">
                  <img src={img} className="card-type-img" alt="" />
                </div>
              </div>
            </div>
            <div className="franchise-content-wrapper">
              <div className="franchise-sub-heading">
                <span className="krishak">KRISHAK</span>
                <span className="vatika">VATIKA</span>
              </div>
              <div className="franchise-paragraph-content">
                <p className="franchise-para">
                  <span className="franchise-tag">TWICKS Franchise</span>, is
                  here to provide you with all the support you need and to share
                  with you, our tried and tested knowledge!
                </p>
              </div>
              <div className="franchise-block-card">
                <div className="block-card">
                  <div className="content-card">
                    <h3 className="h3-franchise-tag">Quality Adherence</h3>
                  </div>
                </div>
                <div className="block-card">
                  <div className="content-card">
                    <h3 className="h3-franchise-tag">Grounded</h3>
                  </div>
                </div>
                <div className="block-card">
                  <div className="content-card">
                    <h3 className="h3-franchise-tag">Impactful</h3>
                  </div>
                </div>
                <div className="block-card">
                  <div className="content-card">
                    <h3 className="h3-franchise-tag">Bold</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="franchise-section2">
            <div className="fran-section2">
              <div className="row">
                <div className="col-7">
                  <div className="upper-section">
                    <h5 className="perk-section">Perks of Owning a</h5>
                    <div className="franchise-content-section-tag">
                      <span className="krishak-section">KRISHAK VATIKA</span>
                    </div>
                  </div>

                  <div className="right-div-section-part">
                    <div className="lineImg">
                      <img
                        src={lineImg}
                        alt=""
                        className="img-lining-section"
                      />
                    </div>
                    <div className="card-fran-section">
                      <div className="animation">
                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Help in choosing the best location
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Startup Kit
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Process Service Book
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Stock Management System
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Staff Education & Training
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Support & Expert Guidance
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Logistic Support
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Long-Term Agreement
                          </p>
                        </div>
                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Help in choosing the best location
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Startup Kit
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Process Service Book
                          </p>
                        </div>

                        <div className="single-fanchise-card">
                          <p className="section-franchise-card-section">
                            Stock Management System
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="know-more-btn">
                    <button className="btn-knowing-more-fran">Know more</button>
                  </div>
                </div>
                <div className="col-5">
                  <div className="section2-part2-img">
                    <img src={sideImg} alt="" className="sideimg-fran" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="map-section">
            <div className="section-map-fran row">
              <div className="img-section-map-fran col-6">
                {/* <img src={mapImg} className="mapImg" alt="" /> */}
              </div>

              <div className="map-section-card col-6">
                <div className="map-number">
                  <h2 className="map-number-70"> 70+</h2>
                </div>
                <div className="map-content">
                  <h3 className="h3-content">FRENCHISE OVER INDIA</h3>
                </div>
                <div className="map-para">
                  <span className="para-unevil">
                    <i>
                      Unveil unique products & services not found{" "}
                      <b> elsewhere</b>
                    </i>
                  </span>
                </div>
                {/* <div className="content-map-fan">
                  <p
                    style={{
                      fontWeight: "700",
                      marginTop: "2rem",
                      color: "#19443F",
                    }}
                  >
                    Find the stores near you!
                  </p>
                </div> */}

                {/* <div className="search-bar">
                  <input
                    type="text"
                    name="search"
                    className="search-container"
                  />
                  <div className="search-button">
                    <button className="search-icon">
                      <i class="bi bi-search"></i>
                    </button>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ExclusiveStore;
