import React, { useEffect, useState } from "react";
import logo from "../../assets/Tafi_logo_white.png";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import "./header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(undefined);
  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  // const onLogout = () => {
  //   localStorage.clear();
  //   navigate("/auth/login");
  // };


  const onLogout = () => {
    confirmAlert({
       title: 'Logout',
       message: `Leaving so soon? Would hate to see you go!`,
       buttons: [
         {
           label: 'OK',
           onClick: () => {
             // Clear local storage and navigate to the login page only after the user confirms
             localStorage.clear();
             window.location.reload(); // Force refresh
             navigate("/auth/login");
           }
         },
         {
           label: 'Cancel',
           onClick: () => {
            navigate("/");
             // Do nothing if the user clicks 'Cancel'
           }
         }
       ]
    });
   };
   

  const location = useLocation();
const scrollToTop = ()=>{
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
  return (
    <nav
      className="heading navbar bg-body-tertiary navbar-expand-lg fixed-top"
      id="head"
    >
      <div className="header sticky-xxl-top container-fluid">
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
        <div
          className="offcanvas offcanvas-end "
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel"></h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body justify-content-around row">
            <div className="link-section col-md-7 justify-content-around">
              <Link
                to="/"
                className={location.pathname === "/" ? "active-link" : ""}
                onClick={scrollToTop}
              >
                <span>Home </span>
              </Link>
              <Link
                to="/shopPage"
                className={
                  location.pathname === "/shopPage" ? "active-link" : ""
                }
                onClick={scrollToTop}
              >
                <span>Shop</span>
              </Link>
              <Link
                to="/services"
                className={
                  location.pathname === "/services" ? "active-link" : ""
                }
                onClick={scrollToTop}
              >
                <span>Service </span>
              </Link>
              <Link
                to="/about"
                className={location.pathname === "/about" ? "active-link" : ""}
                onClick={scrollToTop}
              >
                <span>About Us</span>
              </Link>
              <Link
                to="/exclusivestore"
                className={
                  location.pathname === "/exclusivestore" ? "active-link" : ""
                }
                onClick={scrollToTop}
              >
                <span>Exclusive Store</span>
              </Link>
              <Link
                to="/blog"
                className={location.pathname === "/blog" ? "active-link" : ""}
                onClick={scrollToTop}
              >
                <span>Resource center</span>
              </Link>
            </div>
            <div className="login-section col-md-5">
            {user && user.role.role === "User" && (
                <Link
                  className="signin"
                  to={`/Cart`}
                  onClick={scrollToTop}
                >
                  <i class="bi bi-cart3"></i>
                </Link>
              )}
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
              {user && user.role.role === "User" && (
                <Link
                  className="register myaccount"
                  to={`/myaccount/${userId}`}
                >
                  My account
                </Link>
              )}
              {user && (
                <Link className="signin" to={`/auth/login`} onClick={onLogout}>
                  Logout
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
