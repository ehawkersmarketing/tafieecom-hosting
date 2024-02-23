import React, { useState, useEffect } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import "./Checkout.css";
import axios from "axios";

import { useFetch } from "../../hooks/api_hook";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const Checkout = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user.userName)
    useEffect(() => {
        if (user) {
               navigate('/checkout')
        } else {
          navigate("/auth/login");
        }
      }, []);
    let { data: cart } = useFetch(`/api/getProductsInCart/${user?._id}`)
    console.log(cart)
    const products = cart?.products;
    console.log("hyyyy",products)
    const [shipCharge, setShipCharge] = useState(undefined);

  const [formData, setFormData] = useState({
    userName: "",
    Contact: "",
    Email: "",
    Address: "",
    Address2: "",
    City: "",
    State: "",
    PinCode: "",
    Country: "",
  });


  const [contact, setContact] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setContact(event.target.value);

    
  };


    const shipChargeFunction = async (event) => {
        event.preventDefault();
        try {
            //  if (formData.Email === "") {
            //     alert("Enter your email");
            // }  else if (formData.Address === "") {
            //     alert("Enter your address");
            // } else if (formData.City === "") {
            //     alert("Enter your City");
            // } else if (formData.State === "") {
            //     alert("Enter your State");
            // } else if (formData.PinCode === "") {
            //     alert("Enter your Pin Code");
            // } else if (formData.Country === "") {
            //     alert("Enter your Country");
            // } else {
                const response = await axios.post(
                    "http://localhost:8080/api/ship/calcShipment",
                    {
                        shipping_postcode: formData.PinCode,
                        weight: cart.totalWeight,
                        declared_value: cart.totalPrice,
                        is_return: 0,
                    }
                );
                setShipCharge(response.data.shipPrice);
                console.log(shipCharge);
            }
        catch (error) {
            console.error("Failed to fetch ship details", error);
        }
    };

  // const secondHandler=(event)=>{
  //   if (event.target.value.length < 10) {

  //   } else {
  //     setErrorMessage("");
  //   }
  // }

  
  const handleOrderFunction = async (event) => {
    event.preventDefault();
    try {
      if (shipCharge === undefined) {
        alert(
          "Submit adress details and calculate shipment before placing order"
        );
      } else {
        const { data } = await axios.post(
          "http://localhost:8080/api/putUserAddress",
          {
            userId: user._id,
            street: formData.Address,
            landmark: formData.Address2,
            email: formData.Email,
            userName: formData.userName,
            city: formData.City,
            country: formData.Country,
            state: formData.State,
            zipCode: formData.PinCode,
          }
        );
        if (data.success) {
          const totalPayAmount = cart.totalPrice + 0;
          const { data } = await axios.post(
            "http://localhost:8080/api/pay/phonePePayment",
            {
              amount: Math.round(totalPayAmount),
              cartId: cart.cartId,
            }
          );
          if (data.success) {
            window.location.replace(data.data);
          }
        } else {
          toast.error(`${data.message}`, {
            position: "bottom-right",
            autoClose: 8000,
            pauseOnHover: true,
            draggable: true,
            theme: "dark",
          });
        }
      }
    } catch (error) {
      console.error("Failed to submit form", error);
    }
  };
  return (
    <div>
      <Header />
      <section>
        <div className="checkout-page">
          <div className="checkout-page-heading">
            <h1>
              <strong>Checkout</strong>
            </h1>
          </div>
          <div className="checkout-page-form ">
            <form className="row" onSubmit={shipChargeFunction}>
              <div className="row col-12 firstinput">
                <div className="col-6">
                  <div className="checkout-page-input checkout1">
                    <label htmlFor="Name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="userName"
                      value={user?.userName}
                      placeholder="Name"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkout-page-input checkout2">
                    <label htmlFor="contact">Contact No.</label>
                    <input
                      type="tel"
                      id="Contact"
                      name="Contact"
                      placeholder="Contact Number"
value={user?.phone}
                      required
                     onChange={handleInputChange}
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                  </div>


                </div>
              </div>
              <div className="checkout-page-input">
                <label htmlFor="email">Email Address</label>
                <input
                  type="text"
                  id="Email"
                  name="Email"
                  placeholder="Email Address"
                  onChange={handleInputChange}
                />
                
              </div>
              <div className="row col-12 firstinput">
                <div className="col-6">
                  <div className="checkout-page-input checkout1">
                    <label htmlFor="contact">Address Line 1</label>
                    <input
                      type="text"
                      id="Address"
                      name="Address"
                      placeholder="Address Line 1"
                      required
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <div className="checkout-page-input checkout2">
                    <label htmlFor="contact">Address Line 2</label>
                    <input
                      type="text"
                      id="Address2"
                      name="Address2"
                      placeholder="Address Line 2"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="checkout-page-input">
                <label htmlFor="City">Town / City</label>
                <input
                  type="text"
                  id="City"
                  name="City"
                  placeholder="Town / City"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="checkout-page-input ">
                <label htmlFor="State">State</label>
                <input
                  type="text"
                  id="State"
                  name="State"
                  placeholder="State"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="checkout-page-input ">
                <label htmlFor="Pincode">Pincode</label>
                <input
                  type="tel"
                  id="PinCode"
                  name="PinCode"
                  placeholder="Pincode"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="checkout-page-input">
                <label htmlFor="Country">Country / Region</label>
                <input
                  type="text"
                  id="Country"
                  name="Country"
                  placeholder="Country / Region"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <button className="checkout-btn" onClick={shipChargeFunction}>
                Calculate shipping price
              </button>
            </form>
            <div className="checkout-page-payment-details" id="shipment">
              <div className="checkout-page-table-button">
                <div className="checkout-page-table-details">
                  <div>
                    <p>
                      <strong>Your Order</strong>
                    </p>
                  </div>
                  <table className="checkout-table">
                    <tr>
                      <th>Product</th>
                      <th>Subtotal</th>
                    </tr>
                    {products &&
                      products.length > 0 &&
                      products.map((product) => {
                        return (
                          <tr>
                            <td>
                              {product.productId.title} x {product.units}
                            </td>
                            <td>
                              {(
                                product.productId.price * product.units
                              )?.toLocaleString("en-IN")}
                            </td>
                          </tr>
                        );
                      })}
                    <tr>
                      <td>Subtotal</td>
                      <td>
                        {(cart?.totalPrice + shipCharge ?? 0)?.toLocaleString(
                          "en-IN"
                        )}
                      </td>
                    </tr>
                    {shipCharge && (
                      <tr>
                        <td>Delivery Charge</td>
                        <td>{shipCharge}</td>
                      </tr>
                    )}
                    <tr>
                      <th>Total</th>
                      <th>{cart?.totalPrice + shipCharge ?? 0}</th>
                    </tr>
                  </table>
                </div>

                <button
                  className="checkout-btn"
                  onClick={(e) => handleOrderFunction(e)}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Checkout;