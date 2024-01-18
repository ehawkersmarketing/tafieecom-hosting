import React from "react";
import logo from "../../assets/Tafi_logo_white.png";
import "./header.css";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="logo-section">
          <img src={logo} alt="" />
        </div>
        <div className="link-section">
          <a href="">
            <span>Home </span>
          </a>
          <a href="">
            <span>Shop</span>
          </a>
          <a href="">
            <span>Franchise interest</span>
          </a>
          <a href="">
            <span>Resource center</span>
          </a>
        </div>
        <div className="login-section">
          <button className="register">Register</button>
          <button className="signin">Sign In</button>
        </div>
      </div>
    </>
  );
};

export default Header;
