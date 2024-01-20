import React from "react";

import "./Cart.css";

const minus = document.querySelector(".minus");
const plus = document.querySelector(".plus");

// plus.addEventListener('click',() => document.getElementById("number").textContent++);

// minus.addEventListener('click',() => document.getElementById("number").textContent--);

const Cart = () => {
  return (
    <div className="cart-page">
      <div className="cart-header">
        <h2 className="page-header">Cart</h2>
      </div>
      <div className="cart-overall">
        <table className="cartTable">
          <thead className="table-head">
            <tr className="table-row">
              <th>Product Name</th>
              <th>Price (INR)</th>
              <th>Quantity</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody className="table-body">
            <tr className="table-row">
              <td>Fertilizer</td>
              <td>500.00</td>
              <td>
                <button class="minus">-</button>
                <span id="number">1</span>
                <button class="plus">+</button>
              </td>
              <td>500.00</td>
            </tr>
          </tbody>
          <tfoot className="table-footer">
            <tr className="table-row">
              <td>Total Gross</td>
              <td></td>
              <td></td>
              <td>500.00</td>
            </tr>
          </tfoot>
        </table>

        <div className="checkout-subtotal">
          <div className="subtotal">
            <p>Subtotal: </p>
            <hr class="solid" />
          </div>
          <div className="checkout-address">
            <div className="checkout-address-heading">
              <h4>Shipping Address: </h4>
            </div>
            <div className="checkout-address-text">
              <p>Address: 456 Billing Street</p>
              <p>Pin:</p>
              <p>City: Billing City</p>
            </div>
          </div>
          <div className="checkout">
            <button>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
