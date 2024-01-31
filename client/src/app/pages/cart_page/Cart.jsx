
import React, { useEffect, useState } from "react";

import "./Cart.css";
import { useFetch } from "../../hooks/api_hook";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import Header from '../../pages/header/header'
import Footer from '../../pages/footer/footer'

const Cart = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  useEffect(() => {
    if (user) {
    } else {
      navigate("/auth/login");
    }
  }, []);
  let { data: cart } = useFetch(`/api/getCartByUser/${user?._id}`)


  useEffect(() => {
    if (cart) {
      let totalPrice = 0;
      for (let i = 0; i < cart.products.length; i++) {
        totalPrice += cart.products[i]?.productId?.price * cart.products[i]?.units;
      }
      setTotal(totalPrice);
    }
  }, [cart]);

  const increaseValueHandler = async (index) => {
    try {
      if (cart.products[index].units == cart.products[index].productId.units.maxQuantity) {
        toast.error(`You have reached product max limit`, {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        const { data } = await axios.put(`http://localhost:8080/api/addToCart`, {
          "userId": user._id,
          "productId": cart.products[index].productId._id,
          "units": 1
        });
        if (data.success) {
          window.location.reload();
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
      toast.error(`${error.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  const decreaseValueHandler = async (index) => {
    try {
      const { data } = await axios.delete(`http://localhost:8080/api/dropFromCart/${user._id}/${cart.products[index].productId._id}`);
      if (data.success) {
        window.location.reload();
      } else {
        toast.error(`${data.message}`, {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };
  return (
    <>
     <Header />
   
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
            {
              cart && cart.products.map((item, index) => {
                return (
                  <tr className="table-row" key={index}>
                    <td>{item?.productId?.title}</td>
                    <td>{item?.productId?.price}</td>
                    <td>
                      <button class="minus" onClick={(e) => decreaseValueHandler(index)}>
                        -
                      </button>
                      <span id="number">{item?.units}</span>
                      <button class="plus" onClick={(e) => increaseValueHandler(index)}>
                        +
                      </button>
                    </td>
                    <td>{(item?.productId?.price * item?.units)?.toLocaleString("en-IN")}</td>
                  </tr>
                );
              })
            }
          </tbody>
          <tfoot className="table-footer">
            <tr className="table-row">
              <td>Total Gross</td>
              <td></td>
              <td></td>
              <td>{total}</td>
            </tr>
          </tfoot>
        </table>
        
        <div class="emptyDiv"></div>


        <div className="checkout-subtotal">
          <div className="subtotal">
            <p>Subtotal: {total?.toLocaleString("en-IN")}</p>
          </div>
          <div className="checkout" onClick={() => navigate('/checkout')}>
            <button>Proceed To Checkout</button>
          </div>
        </div>
      </div>
      <ToastContainer />
      
    </div>
    <Footer/>
    </>
  );
};

export default Cart;
