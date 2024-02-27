import React, { useEffect, useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";

import "./OrderConformationPage.css";
import tick_icon from "../../assets/tick_icon.png";
import { useFetch } from "../../hooks/api_hook";
import dayjs from "dayjs";
// import { useFetch } from 'path-to-your-useFetch-hook';
import Carousal from "../../components/carousal/carousal";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const OrderConformationPage = () => {
  const { id } = useParams();
  const { data } = useFetch(`/api/getOrderById/${id}`);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: products } = useFetch("/api/allProducts");
  const { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   // Function to fetch order data from the backend
  //   const fetchOrder = async () => {
  //     try {
  //         const response = await fetch("http://localhost:8080/api/getOrderById/" + id);
  //            console.log("id" ,id)
  //         if (response) {
  //           const data = await response.json();
  //          console.log(data.data)
  //          if(data.data === null){
  //           console.log("empy")
  //           navigate(`/myaccount/${user?._id}`);
  //          }
  //          if(data.success === false){
  //           console.log("navigate")
  //           navigate(`/myaccount/${user?._id}`);
  //         }else if(data.success === true){
  //           if(data.data.user._id === user?._id){
  //             console.log("vkdvd")
  //           }else if(data.data === null ) {
  //             console.log("data is null")
  //             navigate(`/myaccount/${user?._id}`);
  //           }else{
  //             console.log("go navigate")
  //             navigate(`/myaccount/${user?._id}`);
  //           }
  //         }
  //         } else {
  //           throw new Error('Order not found');
  //         }

  //       }catch (error) {
  //         setError(error.message);
  //       }
  //     }

  //   fetchOrder();

  // }, [id]);

  const handleDownload = () => {
    navigate(`/invoice/${id}`);
  };

  const orderHandler = () => {
    navigate(`/myaccount/${user?._id}`);
  };
  useEffect(() => {
    console.log(data);
    //  if(!data?.user){
    //   console.log("go to account")
    //   navigate(`/myaccount/${user?._id}`);
    //  }
    if (data?.user && user) {
      console.log(data?.user, user);
      if (data.user._id !== user?._id) {
        console.log("navigatee");
      } else {
        console.log(" kd d dk");
      }
    }

    if (!user) {
      console.log("user not found");
      navigate(`/myaccount/${user?._id}`);
    }
  }, [data, user]);

  return (
    <>
      <Header />

      <div className="main order-confirm">
        <div className="main-1 row align-items-center">
          <div className="order-header col-12">
            <div className="element row justify-content-between">
              <div className="col-sm-9">
                
                <div className="title">
                  <h2>
                    <strong>Thank you, your order has been placed</strong>
                  </h2>
                </div>
                <div className="title">
                  <h2>
                    <strong>Sorry, your order has been Failed</strong>
                  </h2>
                </div>

                <div className="sub-title">
                  <p>
                    <strong>
                      The order confirmation has been sent to your email address
                    </strong>
                  </p>
                </div>
              </div>
              <div className="invoice-download col-sm-3">
                <button type="link" onClick={handleDownload}>
                  {" "}
                  <div>
                    <strong>
                      Download <br />
                      Invoice
                    </strong>
                  </div>
                  <i class="bi bi-download"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="all-data row">
            <div className="col-md-9">
              <div className="details justify-content-between row">
                <div className="OrderDetails col-sm-4">
                  <div className="OrderDetails-text">
                    <h4>
                      <strong>Order Details:</strong>
                    </h4>
                    <div className="row">
                      <p className="col-5">Order ID: </p>
                      <p className="col">{data && data._id}</p>
                    </div>
                    <div className="row">
                      <p className="col-5">Order Total: </p>
                      <p className="col">
                        {data &&
                          `INR ${(
                            data.amount + data.shipment_charge
                          ).toLocaleString("en-IN")}`}
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-5">Date: </p>
                      <p className="col">
                        {data && dayjs(data.timestamps).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <div className="row">
                      <p className="col-5">Time: </p>
                      <p className="col">
                        {data && dayjs(data.timestamps).format("hh:mm A")}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="ShippingDetails col-sm-4">
                  <div className="ShippingDetails-text">
                    <h4>
                      <strong>Shipping Details:</strong>
                    </h4>
                    <div className="row">
                      <p className="col-5">Name: </p>
                      <p className="col">{data && data.user.userName}</p>
                    </div>
                    <div className="row">
                      <p className="col-5">Address: </p>
                      <p className="col">{data && data.userAddress.street}</p>
                    </div>
                    <div className="row">
                      <p className="col-5">Pin: </p>
                      <p className="col">{data && data.userAddress.zipCode}</p>
                    </div>
                    <div className="row">
                      <p className="col-5">Contact No. </p>
                      <p className="col">{data && data.user.phone}</p>
                    </div>
                  </div>
                </div>
                <div className="BillingDetails col-sm-4">
                  <div className="BillingDetails-text">
                    <h4>
                      <strong>Billing Address:</strong>
                    </h4>
                    <div className="row">
                      <p className="col-5">Address: </p>
                      <p className="col">{data && data.userAddress.street}</p>
                    </div>
                    <div className="row">
                      <p className="col-5">Pin: </p>
                      <p className="col">{data && data.userAddress.zipCode}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="status col-3">
              <div>
                <img src={tick_icon} />
              </div>
              <div
                style={{
                  fontSize: "11rem",
                  color: "red",
                }}
              >
                <i class="bi bi-x-circle-fill"></i>
              </div>
            </div>
          </div>
          <div className="order-link">
            <a href="">
              <button type="link" onClick={orderHandler}>
                <strong>My Order</strong>
              </button>
            </a>
          </div>
        </div>

        <div className="card-carousel-title">
          <h2 className="recommended">Recommended</h2>
          <h2 className="foryou">For You</h2>
        </div>
        <div className="best-seller-product">
          {products && <Carousal items={products} cart={cart} />}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrderConformationPage;
