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
  const user = JSON.parse(localStorage.getItem("user"));
  const { data: userData } = useFetch(`/auth/user/${user?._id}`);

  useEffect(() => {
    if (user) {
      navigate("/checkout");
    } else {
      navigate("/auth/login");
    }
  }, []);
  let { data: cart } = useFetch(`/api/getProductsInCart/${user?._id}`);
  const products = cart?.products;
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

  const [errors, setErrors] = useState({
    Email: false,
    Address: false,
    City: false,
    State: false,
    PinCode: false,
    Country: false,
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

  //   const shipChargeFunction = async (event) => {
  //     event.preventDefault();
  //     try {
  //       if (formData.Email === "") {
  //         alert("Enter your address");
  // } else if (formData.Address === "") {
  //         alert("Enter your address");
  //       } else if (formData.City === "") {
  //         alert("Enter your City");
  //       } else if (formData.State === "") {
  //         alert("Enter your State");
  //       } else if (formData.PinCode === "") {
  //         alert("Enter your Pin Code");
  //       } else if (formData.Country === "") {
  //         alert("Enter your Country");
  //       } else {
  //         const response = await axios.post(
  //           "http://localhost:8080/api/ship/calcShipment",
  //           {
  //             shipping_postcode: formData.PinCode,
  //             weight: cart.totalWeight,
  //             declared_value: cart.totalPrice,
  //             is_return: 0,
  //           }
  //         );
  //         setShipCharge(response.data.shipPrice);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch ship details", error);
  //     }
  //   };

  // const secondHandler=(event)=>{
  //   if (event.target.value.length < 10) {

  //   } else {
  //     setErrorMessage("");
  //   }
  // }

  const shipChargeFunction = async (event) => {
    event.preventDefault();
    const newErrors = {
      Email: formData.Email === "",
      Address: formData.Address === "",
      City: formData.City === "",
      State: formData.State === "",
      PinCode: formData.PinCode === "",
      Country: formData.Country === "",
    };
    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => !error)) {
      // Proceed with the axios post request if there are no errors
      try {
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
      } catch (error) {
        console.error("Failed to fetch ship details", error);
      }
    }
  };

  const handleOrderFunction = async (event) => {
    event.preventDefault();
    try {
      if (shipCharge === undefined) {
        alert(
          "Submit adress details and calculate shipment before placing order"
        );
      } else {
        // const { data } = await axios.post(
        //   "http://localhost:8080/api/putUserAddress",
        //   {
        //     userId: user._id,
        //     userName:formData.userName,
        //     street: formData.Address,
        //     landmark: formData.Address2,
        //     email: formData.Email,
        //     city: formData.City,
        //     country: formData.Country,
        //     state: formData.State,
        //     zipCode: formData.PinCode,
        //   }
        // );
        // if (data.success) {
        const totalPayAmount = cart.totalPrice + shipCharge;
        const { data } = await axios.post(
          "http://localhost:8080/api/pay/phonePePayment",
          {
            amount: totalPayAmount,
            cartId: cart.cartId,
            street: formData.Address,
            landmark: formData.Address2,
            city: formData.City,
            country: formData.Country,
            state: formData.State,
            zipCode: formData.PinCode,
          }
        );
        if (data.success) {
          window.location.replace(data.data);
        }
        // } else {
        //   toast.error(`${data.message}`, {
        //     position: "bottom-right",
        //     autoClose: 8000,
        //     pauseOnHover: true,
        //     draggable: true,
        //     theme: "dark",
        //   });
        // }
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
                      value={userData?.userName}
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
                  </div>
                </div>
              </div>
              <div className="checkout-page-input">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  placeholder="Email Address"
                  onChange={handleInputChange}
                />
                {errors.Email && (
                  <p className="error-message">Please enter your email</p>
                )}
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
                    {errors.Address && (
                      <p className="error-message">Please enter your Address</p>
                    )}
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
                {errors.City && (
                  <p className="error-message">Please enter your city</p>
                )}
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
                {errors.State && (
                  <p className="error-message">Please enter your state</p>
                )}
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
                {errors.PinCode && (
                  <p className="error-message">Please enter your pincode</p>
                )}
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
                {errors.Country && (
                  <p className="error-message">Please enter your country</p>
                )}
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
                      <td>Product Subtotal</td>
                      <td style={{ fontWeight: 700 }}>
                        {(cart?.totalPrice ?? 0)?.toLocaleString("en-IN")}
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
