import React from "react";
// import footer_img from "../Assets/footer-img.png";
import footer_img from "../assets/footer-img.png";
import logo from "../assets/Tafi_logo_white.png"
// import logo1 from "../Assets/Tafi_logo_white1.png";
import "./footer.css";

const Footer = () => {
  return (
    <>
    <div className="footer">
    <div className="upper-footer">
    </div>
      <div className="main-footer">
        <div className="container">
          <div className="row">
            {/* column 1 */}
            <div className="col-1">
              <h6>All Copyrights Reserver @ TAFI</h6>
              <img src="" />
              <img src="" />
              <img src="" />
              <img src="" />
            </div>
            {/* column 2 */}
            <div className="col-2">
              <div className="col-2-1">
              <h6>LEGAL</h6>
              <a href="">Privacy Policy</a>
              <a href="">T&C</a>
              </div>
              <div className="col-2-2">
              <h6>Pages</h6>
              <a href="">Contact Us</a>
              <a href="">Blog</a>
              </div>
            </div>
            {/* column 3 */}
            <div className="col-3">
                <img src={logo} />
            </div>

            
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Footer;
