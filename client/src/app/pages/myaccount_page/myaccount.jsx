import "./myaccount.css";
import React, { useState, useEffect } from "react";
import { useNavigate , useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../header/header";
import logoImage from "../../assets/Tafi_logo_white.png";
import { useFetch  } from "../../hooks/api_hook";
import dayjs from 'dayjs';

const Myaccount = () => {
  const [value, setValue] = useState(0);
  const accountHandler = () => setValue(0);
  const orderHandler = () => setValue(1);
  const logoutHandler = () => {
    localStorage.clear();
    navigate('/auth/login')
  }
  const navigate = useNavigate();
  const { id } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: userData } = useFetch(`/auth/user/${id}`);
  const {data:locationData} = useFetch(`/api/getUserAddress/${user?._id}`);
  console.log(userData);


  useEffect(() => {
    if (user) {
      if (user.role.role === "Admin" || user.role.role === "Editor") {
        navigate('/')
      }
    } else {
      navigate("/auth/login");
    }
  }, [user]);
  
  const submitHandler = () =>{
    navigate(`/updateUser/${userData?._id}`)
  }
  
  return (
    <div>
      <Header />
      <div className="user-account">
        <div className="account row">
          <div className="col-3 account-dashboard">
            <div className="div-admin">
              <div>
                <div className="top-div"></div>
                <div className="logo">
                  <div className="name">
                    <h2>
                      <span>Welcome Back</span>
                    </h2>
                    <h4>
                      <span>{userData?.userName}</span>
                    </h4>
                  </div>
                </div>
              </div>
              <div className="sidebar">
                <div>
                  <div className="sidebar-title">
                    <div className="icon">
                      <i class="bi bi-person-circle"></i>
                    </div>
                    <div className="title" onClick={accountHandler}>
                      Account
                    </div>
                  </div>
                </div>
                <div>
                  <div className="sidebar-title">
                    <div className="icon">
                      <i class="bi bi-basket-fill"></i>
                    </div>
                    <div className="title" onClick={orderHandler}>
                      Order
                    </div>
                  </div>
                </div>
                <div>
                  <div className="sidebar-title">
                    <div className="icon">
                      <i class="bi bi-person-circle"></i>
                    </div>
                    <div className="title" onClick={logoutHandler}>
                      Logout
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-9 account-detail">
            {value == 0 && (
              <div className="profile-detail-outer">
                <div className="profile-head">
                  <h2>
                    <span>Profile Details</span>
                  </h2>
                </div>
                <div className="profile-detail">
                  <table>
                    <tbody>
                      <tr>
                        <td>User Name :</td>
                        <td>
                          <span>{userData?.userName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Mobile Number :</td>
                        <td>
                          <span>{userData?.phone}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Email ID :</td>
                        <td>
                          <span>{userData?.email}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Date of Birth :</td>
                        <td>
                          <span>{dayjs(userData?.dob).format('MMM D, YYYY')}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Location :</td>
                        <td>
                          <span>{locationData?.city}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="edit-button">
                  <button type="submit" className="edit">
                   <Link style={{ color: "white" , outline:"none", textDecoration:"none" }} to={`/updateUser/${userData?._id}`}>EDIT</Link> 
                  </button>
                </div>
              </div>
            )}
            {value == 1 && (
              <div className="card admin-product-card" id="order">
                <div className="subHeading">
                  <div className="admin-card-heading">
                    <h1 className="h1">All Orders</h1>
                    <div className="admin-card-header">
                      <h3 className="h3">Orders</h3>
                    </div>
                  </div>
                  <div className="admin-table-div">
                    <table class="table table-hover">
                      <thead>
                        <tr>
                          <th scope="col" className="th">
                            Sr.No.
                          </th>
                          <th scope="col" className="th">
                            Featured Image
                          </th>
                          <th scope="col" className="th">
                            Product Name
                          </th>
                          <th scope="col" className="th">
                            Price
                          </th>
                          <th scope="col" className="th">
                            Delivered on
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row table-center">1.</th>
                          <td className="td ">
                            <img src="/image.com" />
                          </td>
                          <td className="td">Fertilizer</td>
                          <td className="td">199</td>
                          <td className="td ">17/01/2024</td>
                        </tr>
                        <tr>
                          <th scope="row table-center">2.</th>
                          <td className="td">
                            <img src="/image.com" />
                          </td>
                          <td className="td">Seeds</td>
                          <td className="td">199</td>
                          <td className="td ">17/01/2024</td>
                        </tr>
                        <tr>
                          <th scope="row table-center">3.</th>
                          <td className="td">
                            <img src="/image.com" />
                          </td>
                          <td className="td ">Anmol sir</td>
                          <td className="td">199</td>
                          <td className="td ">17/01/2024</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
            {value == 2 && (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Myaccount;
