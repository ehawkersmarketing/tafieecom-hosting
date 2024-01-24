import React from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import './Checkout.css'

const Checkout = () => {
    return(
        <div>
            <Header />
            <section>
            {
        <div className="checkout-page">
          <div className="checkout-page-heading">
            <h1><strong>Checkout</strong></h1>
          </div>
          <div className="checkout-page-form ">
            <form className="row">
                <div className="checkout-page-input col-6">
                <label htmlFor="Name">Name</label>
                <input
                    type="text"
                    id="Name"
                    name="Name"
                    placeholder="Name"
                    required
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
                />
                </div>
                <div className="checkout-page-input">
                <label htmlFor="email">Email Address</label>
                <input
                    type="text"
                    id="Email"
                    name="Email"
                    placeholder="Email Address"
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
                />
                </div>
                <div className="checkout-page-input col-6">
                <label htmlFor="contact">Address Line 2</label>
                <input
                    type="text"
                    id="Address"
                    name="Address"
                    placeholder="Address Line 2"
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
                />
                </div>
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
                            <tr>
                                <td>Product Name X Quantity</td>
                                <td>6000</td>
                            </tr>
                            <tr>
                                <td>Subtotal</td>
                                <td>6000</td>
                            </tr>
                            <tr>
                                <th>Total</th>
                                <th>6000</th>
                            </tr>
                        </table>
                </div>
                
                    <button className="checkout-btn">
                        Place Order
                    </button>
                </div>
            </div>

          </div>
          
        </div>
      }
    </section>
    <Footer />
        </div>
        
    )
}

export default Checkout
