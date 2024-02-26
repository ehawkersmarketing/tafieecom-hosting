import React, { useEffect, useState } from "react";
import logo from "../../assets/Tafi_logo_white.png";

import "./header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  const onLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };
  const location = useLocation();

  return (
    <nav className="heading navbar bg-body-tertiary navbar-expand-lg fixed-top" id="head">
      <div className="header sticky-xxl-top container-fluid" >
        <div className="logo-section navbar-brand col-md-2">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <i class="bi bi-list"></i>
        </button>
        <div className="offcanvas offcanvas-end " tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">
              
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body justify-content-end">
            <div className="link-section col-md-7 justify-content-around">
              <Link
                to="/"
                className={location.pathname === "/" ? "active-link" : ""}
              >
                <span>Home </span>
              </Link>
              <Link
                to="/shopPage"
                className={
                  location.pathname === "/shopPage" ? "active-link" : ""
                }
              >
                <span>Shop</span>
              </Link>
              <Link
                to="/services"
                className={
                  location.pathname === "/services" ? "active-link" : ""
                }
              >
                <span>Service </span>
              </Link>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active-link" : ""}
              >
                <span>About Us</span>
              </Link>
              <Link
                to="/exclusivestore"
                className={
                  location.pathname === "/exclusivestore" ? "active-link" : ""
                }
              >
                <span>Exclusive Store</span>
              </Link>
              <Link
                to="/blog"
                className={location.pathname === "/blog" ? "active-link" : ""}
              >
                <span>Resource center</span>
              </Link>
            </div>
            <div className="login-section col-md-5">
              {!user && (
                <Link className="register" to={`/auth/register`}>
                  Register
                </Link>
              )}
              {!user && (
                <Link className="signin" to={`/auth/login`}>
                  Sign In
                </Link>
              )}
              {user &&
                (user.role.role === "Admin" || user.role.role === "Editor") && (
                  <Link className="register" to={`/adminPage`}>
                    Dashboard
                  </Link>
                )}
              {user && (
                <Link className="signin" to={`/auth/login`} onClick={onLogout}>
                  Logout
                </Link>
              )}
              {user && user.role.role === "User" && (
                <Link
                  className="register myaccount"
                  to={`/myaccount/${userId}`}
                >
                  My account
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
