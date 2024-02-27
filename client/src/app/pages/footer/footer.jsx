import React from "react";
import logo from "../../assets/Tafi_logo_white.png";
import "./footer.css";
import { Link } from "react-router-dom";
import image from "../../assets/Footer_img.svg";
import footer_img from "../../assets/Footer_mask group.png";

const Footer = () => {

  const scrollToTop = () => {
    document.getElementById("head").scrollIntoView({ behavior: "smooth" });
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
                  <div className="form-img col-sm-6 col-12">
                    <div className="headingMainText aao-baat-kre">
                      <h1>आओ,</h1>
                      <h1><span>साथ</span> बढ़ें</h1>
                      <p className="footer-desc"><b><span>Interested in openeing</span> <span>your own exclusive store?</span></b></p>
                    </div>
                  </div>
                  <div className="form-content col-sm-6 col-12">
                    <div className="form">
                      <div className="input-columns">
                        <div className="name">
                          <div className="input-sec">
                            <input type="text" name="name" placeholder="Name" />
                          </div>
                        </div>
                        <div className="email">
                          <div className="input-sec">
                            <input type="text" name="email" placeholder="Mobile No" />
                          </div>
                        </div>
                        <div className="email">
                          <div className="input-sec">
                            <input type="text" name="email" placeholder="Email Id" />
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
              <div className="row foot-navigation">
                {/* column 1 */}
                <div className="column1 col-md-3 col-12">
                  <div className="col-12">
                    <div className="contactus">
                      <h5> Contact Us</h5>
                      <p className="list">E-Mail: <Link to="mailto:info@twicks.in">info@twicks.in</Link></p>
                      <p className="list">Mobile no. : <Link to="tel:918120000506">+91 8120000506</Link></p>
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
                      {/* <Link to="https://twitter.com/TwicksA">
                        <i class="bi bi-twitter"></i>
                      </Link> */}
                      <Link to="https://www.youtube.com/channel/UCFZ7_wK9cZUNZzMzteUSTTA">
                        <i class="bi bi-youtube"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* column 2 */}
                <div className="column2 col-md-7 col-12">
                  <div className="row">
                    <div className="column201 col-md-4 col-12 mb-3">
                      <h5 className="col-12">LEGAL</h5>
                      <div className="inside-column row justify-content-start">
                        <div className="col-6 col-md-12 list">
                          <Link to="/PrivacyPolicy" onClick={scrollToTop}>Privacy Policy</Link>
                        </div>
                        <div className="col-6 col-md-12 list">
                          <Link to="/TermsAndCondition" onClick={scrollToTop}>Terms  & Conditions</Link>
                        </div>
                        <div className="col-6 col-md-12 list">
                          <Link to="/ReturnAndRefund" onClick={scrollToTop}>Return and Refund</Link>
                        </div>
                      </div>
                    </div>
                    <div className="column202 col-md-4 col-12 mb-3">
                      <h5>PAGES</h5>
                      <div className="inside-column row justify-content-start">
                        <div className="col-6 col-md-12 list">
                          <Link to="/exclusivestore" onClick={scrollToTop}>Exclusive Store</Link>
                        </div>
                        <div className="col-6 col-md-12 list">
                          <Link to="/blog" onClick={scrollToTop}>Resource Center</Link>
                        </div>
                      </div>
                    </div>
                    <div className="column202 col-md-4 col-12 mb-3">
                      <h5>SHOPS</h5>
                      <div className="row justify-content-start">
                        <div className="col-6 col-md-12 list">
                          <Link to="/shopPage" onClick={scrollToTop}>Shop</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* column 3 */}
                <div className="column3 col-md-2 col-12">
                  <div className="col-12">
                    <Link to='/' onClick={scrollToTop}><img src={logo} /></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="credits">
            <div className="footer-credit row">
              <div className="col-md-9 col-12">
              All Copyrights Reserved @ TAFI || <br /> Powered by : <b><Link to="https://www.ehawkersmarketing.in" target="_blank">e-Hawkers Marketing LLP, Indore</Link></b> 
              </div>
              <div className=" col-md-3 col-12 made">
                Made in India
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;