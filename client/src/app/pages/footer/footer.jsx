import React from "react";
import logo from "../../assets/Tafi_logo_white.png";
import "./footer.css";
import { Link } from "react-router-dom";
import image from "../../assets/Footer_img.svg";
import footer_img from "../../assets/Footer_mask group.png";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="main-footer">
          <div className="extracontainer"></div>
          <div className="upper-container"></div>
          <div className="bottom-container">
            <div className="middle-container">
              <div className="full-form">
                <div className="in-image row">
                  <div className="form-img col-7">
                    <div className="aao-baat-kre">
                      <h1>
                        <div>
                        (AAO 
                        </div>
                        <div><span> BAAT </span>
                        </div>
                        <div> KARE)
                        </div>
                      </h1>
                    </div>
                  </div>
                  <div className="form-content col-5">
                    <div className="form">
                      <div className="input-columns">
                        <div className="name">
                          <div className="input-sec">
                            <input type="text" placeholder="Name" />
                          </div>
                        </div>
                        <div className="email">
                          <div className="input-sec">
                            <input type="text" placeholder="Email/Mobile No" />
                          </div>
                        </div>
                        <div className="message">
                          <div className="input-sec">
                            <textarea
                              type="text"
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
                      <Link>
                        <i class="bi bi-instagram"></i>
                      </Link>
                      <Link>
                        <i class="bi bi-facebook"></i>
                      </Link>
                      <Link>
                        <i class="bi bi-linkedin"></i>
                      </Link>
                      <Link>
                        <i class="bi bi-twitter"></i>
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
                          <Link to="/PrivacyPolicy">Privacy Policy</Link>
                        </div>
                        <div>
                          <Link to="/TermsAndCondition">T&C</Link>
                        </div>
                      </div>
                    </div>
                    <div className="column202 col-4">
                      <h5>PAGES</h5>
                      <div>
                        <div>
                          <Link to="">Contact Us</Link>
                        </div>
                        <div>
                          <Link to="/blog">Blogs</Link>
                        </div>
                      </div>
                    </div>
                    <div className="column202 col-4 ">
                      <h5>SHOPS</h5>
                      <div>
                        <div>
                          <Link to="">Contact Us</Link>
                        </div>
                        <div>
                          <Link to="">Blogs</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* column 3 */}
                <div className="column3 col-2">
                  <div className="col-12">
                    <img src={logo} />
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
