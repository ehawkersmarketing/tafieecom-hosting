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
    <>
      <div className="header">
        <div className="logo-section col-2">
          <Link to="/">
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="link-section col-7 justify-content-around">
          <Link
            to="/"
            className={location.pathname === "/" ? "active-link" : ""}
          >
            <span>Home </span>
          </Link>
          <Link
            to="/shopPage"
            className={location.pathname === "/shopPage" ? "active-link" : ""}
          >
            <span>Shop</span>
          </Link>
          <Link
            to="/services"
            className={location.pathname === "/services" ? "active-link" : ""}
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
        <div className="login-section col-3">
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
              <Link className="signin" to={`/adminPage`}>
                Dashboard
              </Link>
            )}
          {user && (
            <Link className="signin" to={`/auth/login`} onClick={onLogout}>
              Logout
            </Link>
          )}
          {user && user.role.role === "User" && (
            <Link className="register myaccount" to={`/myaccount/${userId}`}>
              My account
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
