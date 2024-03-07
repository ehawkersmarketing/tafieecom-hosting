import react from "react";
import "./exclusivestore.css";
import Header from "../header/header";
import img from "../../assets/image 2.png";
import sideImg from "../../assets/Group 358.png";
import lineImg from "../../assets/Line 13.png";
import mapImg from "../../assets/group-section-franchise.png";
import Footer from "../footer/footer";
import Map from "../../components/map/map"

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
              <div className="col-sm-6 franchise-wrapper-content">
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
              <div className="col-sm-6 card-img-franchise">
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
                  <span className="franchise-tag">TWICKS Exclusive Store</span>, is
                  here to provide you with all the support you need and to share
                  with you, our tried and tested knowledge!
                </p>
              </div>
              <div className="franchise-block-card row">
                <div className="block-card col-6 col-md-3 d-flex align-item-center justify-content-center">
                  <div className="content-card">
                    <h3 className="h3-franchise-tag">Quality Adherence</h3>
                  </div>
                </div>
                <div className="block-card col-6 col-md-3 d-flex align-item-center justify-content-center">
                  <div className="content-card">
                    <h3 className="h3-franchise-tag">Grounded</h3>
                  </div>
                </div>
                <div className="block-card col-6 col-md-3 d-flex align-item-center justify-content-center">
                  <div className="content-card">
                    <h3 className="h3-franchise-tag">Impactful</h3>
                  </div>
                </div>
                <div className="block-card col-6 col-md-3 d-flex align-item-center justify-content-center">
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
                <div className="col-sm-7 perks">
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
                <div className="col-sm-5">
                  <div className="section2-part2-img" >
                    <img src={sideImg} alt="" className="sideimg-fran" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          
            <Map />
          
        </div>
    
        <Footer />
      </div>
    </div>
  );
};

export default ExclusiveStore;