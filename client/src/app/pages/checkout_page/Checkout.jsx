import React, { useState } from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import './Checkout.css';
import axios from 'axios';

const Checkout =  () => {
    const userId = localStorage.getItem('user_id');
    const {data: productsData }  = axios.get("/getProductsInCart/"+userId);
    const products = productsData.products;
     
    const [shipCharge, setShipCharge] = useState(undefined);

    const [formData, setFormData] = useState({
       name:"",
       Contact:"",
       Email:"",
       Address:"",
       Address2:"",
       City:"",
       State:"",
       PinCode:"",
       Country:"",
    });
    
     const handleInputChange = (event) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value,
        });
     };
    
    const shipChargeFunction = async () => {
        try {
           const response = await axios.get('/api/calcShipment', {"shipping_postcode":formData.PinCode,"weight":productsData.totalWeight, "declared_value":productsData.totalPrice, "is_return":0});
           setShipCharge(response.data.shipPrice);
        } catch (error) {
           console.error('Failed to fetch ship details', error);
        }
       };

     const handleOrderFunction = async (event) => {
        try {
        if(setShipCharge === undefined){
            alert("Submit adress details and calculate shipment before placing order"); }
        else{
            const totalPayAmount = productsData.totalPrice + setShipCharge;
            await axios.post("/api/pay/phonePayPayment", {"totalPayAmount":totalPayAmount, "cartId":productsData.cartId});
        }
        } catch (error) {
          console.error('Failed to submit form', error);
        }
     };

    return(
        <div>
            <Header />
            <section>
        <div className="checkout-page">
          <div className="checkout-page-heading">
            <h1><strong>Checkout</strong></h1>
          </div>
          <div className="checkout-page-form ">
            <form className="row" onSubmit={shipChargeFunction}>
                <div className="checkout-page-input col-6">
                <label htmlFor="Name">Name</label>
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    placeholder="Name"
                    required
                    onChange={handleInputChange}
                />
                </div>
                <div className="checkout-page-input col-6">
                <label htmlFor="contact">Contact No.</label>
                <input
                    type="number"
                    id="Contact"
                    name="Contact"
                    placeholder="Contact Number"
                    required
                    onChange={handleInputChange}
                />
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
                <div className="checkout-page-input col-6">
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
                <div className="checkout-page-input col-6">
                <label htmlFor="contact">Address Line 2</label>
                <input
                    type="text"
                    id="Address2"
                    name="Address2"
                    placeholder="Address Line 2"
                    onChange={handleInputChange}
                />
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
                    type="number"
                    id="Pincode"
                    name="Pincode"
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
                    <button className="checkout-btn">
                        Calcultate shipping price
                    </button>
            </form>
            <div className="checkout-page-payment-details">
                <div className="checkout-page-table-button">
                    
                    <div className="checkout-page-table-details">
                        <div><p><strong>Your Order</strong></p></div>
                        <table className="checkout-table">
                            <tr>
                                <th>Product</th>
                                <th>Subtotal</th>
                            </tr>
                        {products && products.length >0 && products.map((product)=>{
                         return(
                            <tr>
                                <td>{product.name}+" x "+{product.units}</td>
                                <td>{product.price*product.units}</td>
                            </tr>
                            );
                         })}
                            <tr>
                                <td>Subtotal</td>
                                <td>{productsData.totalPrice}</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <th>{productsData.totalPrice}</th>
                            </tr>
                        </table>
                </div>
                
                    <button className="checkout-btn" onClick={handleOrderFunction}>
                        Place Order
                    </button>
                </div>
            </div>
          </div>
          
        </div>
    </section>
    <Footer />
        </div>
        
    )
}

export default Checkout
