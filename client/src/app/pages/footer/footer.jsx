import React from "react";
import logo from "../../assets/Tafi_logo_white.png";
import "./footer.css";
import { Link } from "react-router-dom";
import image from "../../assets/Footer_img.svg";
import footer_img from "../../assets/Footer_mask group.png";

const Footer = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <div className="footer" id="bottom">
        <div className="main-footer">
          <div className="extracontainer"></div>
          <div className="upper-container"></div>
          <div className="bottom-container">
            <div className="middle-container">
              <div className="full-form">
                <div className="in-image row">
                  <div className="form-img col-6">
                    <div className="headingMainText aao-baat-kre">
                      <h1><span>आओ,</span> </h1>
                      <h1>साथ बढ़ें</h1>
                      <p className="footer-desc"><b><span>Interested in openeing</span> <span>your own franchise?</span></b></p>
                    </div>
                  </div>
                  <div className="form-content col-6">
                    <div className="form">
                      <div className="input-columns">
                        <div className="name">
                          <div className="input-sec">
                            <input type="text" name="name" placeholder="Name" />
                          </div>
                        </div>
                        <div className="email">
                          <div className="input-sec">
                            <input type="text" name="email" placeholder="Email/Mobile No" />
                          </div>
                        </div>
                        <div className="message">
                          <div className="input-sec">
                            <textarea
                              type="text" name="message"
                              placeholder="I'm looking for..."
                            />
                          </div>
                        </div>
                      </div>
                      <div className="send-button">
                        <Link to="" className="send-message-button">
                          Send Message
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer-nav">
              <div className="row">
                {/* column 1 */}
                <div className="column1 col-4">
                  <div className="col-12">
                    <div>
                      <h5>All Copyrights Reserver @ TAFI</h5>
                    </div>
                    <div className="website-icons">
                      <Link to="https://www.instagram.com/twicks_agro/">
                        <i class="bi bi-instagram"></i>
                      </Link>
                      <Link to="https://www.facebook.com/TwicksA">
                        <i class="bi bi-facebook"></i>
                      </Link>
                      <Link to="https://www.linkedin.com/company/twicks-agro-farm-industries-pvt-ltd/">
                        <i class="bi bi-linkedin"></i>
                      </Link>
                      <Link to="https://twitter.com/TwicksA">
                        <i class="bi bi-twitter"></i>
                      </Link>
                      <Link to="https://www.youtube.com/channel/UCFZ7_wK9cZUNZzMzteUSTTA">
                        <i class="bi bi-youtube"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* column 2 */}
                <div className="column2 col-6">
                  <div className="row">
                    <div className="column201 col-4">
                      <h5>LEGAL</h5>
                      <div>
                        <div>
                          <Link to="/PrivacyPolicy" onClick={scrollToTop}>Privacy Policy</Link>
                        </div>
                        <div>
                          <Link to="/TermsAndCondition" onClick={scrollToTop}>T&C</Link>
                        </div>
                      </div>
                    </div>
                    <div className="column202 col-4">
                      <h5>PAGES</h5>
                      <div>
                        <div>
                          <Link to="/exclusivestore" onClick={scrollToTop}>Exclusive Store</Link>
                        </div>
                        <div>
                          <Link to="/blog" onClick={scrollToTop}>Resource Center</Link>
                        </div>
                      </div>
                    </div>
                    <div className="column202 col-4 ">
                      <h5>SHOPS</h5>
                      <div>
                        <div>
                          <Link to="/shopPage" onClick={scrollToTop}>Shop</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* column 3 */}
                <div className="column3 col-2">
                  <div className="col-12">
                    <Link to='/' onClick={scrollToTop}><img src={logo} /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
