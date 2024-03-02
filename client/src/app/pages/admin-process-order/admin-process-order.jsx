import { useEffect, useState } from "react";
import "./admin-process-order.css";
import TafiLogo from "../../assets/Tafi_logo_white.png";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useFetch } from "../../hooks/api_hook";
import { toast, ToastContainer } from 'react-toastify';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const AdminProcessOrder = () => {
  const { id } = useParams();
  const orderId = useParams()
  const [value, setValue] = useState(0);
  const navigate = useNavigate();
  const acceptHandler = () => setValue(1);
  const backHandler = () => setValue(0);
  const { data: order } = useFetch(`/api/getOrderById/${id}`);
  const products = order?.products;
  const user = JSON.parse(localStorage.getItem('user'));
  const userAddress = order?.userAddress;
  const [formData, setFormData] = useState({
    length: 0,
    breadth: 0,
    height: 0,
    weight: 0
  });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(() => {
    if (!user || user.role.role === 'User' || user.role.role === 'Editor') {
      navigate('/auth/login');
    }
  }, []);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const cancelShipment = async () => {
    try {
      const { data } = await axios.post("https://backend.twicks.in/api/ship/cancelRequest", {
        orderId: id,
      });
      if (data.success) {
        toast.success("Amount Refunded successfully", {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
        navigate("/adminPage");
      }
    } catch (error) {
      toast.error(`Amount Refunded Successfully`, {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };
  const dashboardHandler = async () => {
    try {
      if (formData.length == 0 || formData.breadth == 0 || formData.height == 0 || formData.weight == 0) {
        toast.error(`Please provide all details to accept the request`, {
          position: "bottom-right",
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: "dark",
        });
      } else {
        // console.log(formData.length + formData.breadth + formData.height + formData.weight);
        const { data } = await axios.post("https://backend.twicks.in/api/ship/approveRequest", {
          orderId: id,
          length: formData.length,
          breadth: formData.breadth,
          height: formData.height,
          weight: formData.weight,
        });
        if (data.success) {
          navigate("/adminPage");
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
  }

  const [topping, setTopping] = useState("By Self")

  const onOptionChange = e => {
    setTopping(e.target.value)
  }

  const ShippingDeliveryHandler = () =>{
       if(topping === "By Self"){
      axios.patch(`https://backend.twicks.in/api/updateOrder/${id}`, {
          status :"By Self",
        })
        .then((res) => {
          navigate("/adminPage")
        })
        .catch((err) => {
        });

    } else if (topping === "By ShipRocket") {

      axios.patch(`https://backend.twicks.in/api/updateOrder/${id}`, {
        status: "By ShipRocket",
      })
        .then((res) => {
          dashboardHandler();
          navigate("/adminPage")
        })
        .catch((err) => {
        });

    }
  }


  return (
    <>
      <Header />
      <div className="admin-process-main">
        <div className="user-details row">
          <div class="section col-6">
            <div class="section-title">Buyer Information</div>
            <div class="details row">
              <p>Name: {user?.userName}</p>
              <p>Email: {user?.email}</p>
              <p>Phone: {user?.phone}</p>
            </div>
          </div>
          <div class="section col-6">
            <div class="section-title">Billing To</div>
            <div class="details row">
              <p>{userAddress?.street}</p>
              <p>Pin: {userAddress?.zipCode}</p>
              <p>City: {userAddress?.city}</p>
            </div>
          </div>
          <div class="section col-6">
            <div class="section-title">Shipping To</div>
            <div class="details row">
              <p>Address: {userAddress?.street}</p>
              <p>Pin: {userAddress?.zipCode}</p>
              <p>City: {userAddress?.city}</p>
            </div>
          </div>
          <div className="table-details">
            <table>
              <thead>
                <tr>
                  <th>Serial No.</th>
                  <th>Product Name</th>
                  <th>HSN/SAC</th>
                  <th>Quantity</th>
                  <th>
                    Price (INR)<p>(inclusive of taxes)</p>
                  </th>

                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  products && products.map((item, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.productId?.title}</td>
                        <td>{item.productId?.price}</td>
                        <td>{item?.units}</td>
                        <td>{item.productId?.price}</td>

                        <td>{item.productId?.price * item?.units}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
              <tfoot>
                <tr>
                  <td>Shipment Charge</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>{
                    order?.shipment_charge
                  }</td>
                </tr>
                <tr>
                  <td>Total Gross</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>{
                    order?.amount + order?.shipment_charge
                  }</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div class="section">
            <div class="section-bottom">Shipping From:</div>
            <div class="details row">
              <p>
                204, Princess Business SkyPark, Opp. Orbito Mall, A.B. Road,
                Indore
              </p>
              <p>Phone: +91 81200 00506</p>
              <p>Email: support@twicks.in</p>
            </div>
          </div>
        </div>
      </div>
      {order?.orderStatus === "REJECTED" ?
        <div className="accept-reject-button-rejection">
          <span>The order was Rejected , and Refund was Initiated </span>
        </div>
        :
        <div>
          {value == 0 && (
            <div className="accept-reject-button">
              <button
                type="button"
                class="btn btn-primary accept-button m-2"
                onClick={acceptHandler}
              >
                Accept
              </button>
              <button type="button" class="btn btn-secondary reject-button m-2" onClick={cancelShipment}>
                Reject
              </button>
            </div>
          )}
        </div>
      }






      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <div>
            <h3>Select Delivery Option</h3>
            <hr />
            <div>
              <input
                type="radio"
                name="topping"
                value="By Self"
                id="regular"
                checked={topping === "By Self"}
                onChange={onOptionChange}
              />
              <label htmlFor="regular">By Self</label>
            </div>
            <div>
              <input
                type="radio"
                name="topping"
                value="By ShipRocket"
                id="medium"
                checked={topping === "By ShipRocket"}
                onChange={onOptionChange}
              />
              <label htmlFor="medium">By ShipRocket</label>
            </div>
            <hr />
            <p>
              Selected option <strong>{topping}</strong>
            </p>
            <div className="popup-button">
              <div>
                <button className="save-button-a" onClick={ShippingDeliveryHandler}>save</button>
              </div>
              <div>
                <button className="save-button-a" onClick={handleClose}>close</button>
              </div>
            </div>

          </div>
        </Box>
      </Modal>

      {value == 1 && (
        <div className="table-for-input">
          <hr />
          <h5 className="mt-2">
            Please enter below details to process shipment
          </h5>
          <div className="input-table">
            <div className="height row mb-3">
              <lable className="col-2">Height ( in cm. ):</lable>
              <input type="number" name="height" onChange={handleInputChange} className="col-8"></input>
            </div>
            <div className="length row mb-3">
              <lable className="col-2">Length ( in cm. ):</lable>
              <input type="number" name="length" onChange={handleInputChange} className="col-8"></input>
            </div>
            <div className="breadth row mb-3">
              <lable className="col-2">Breadth ( in cm. ):</lable>
              <input type="number" name="breadth" onChange={handleInputChange} className="col-8"></input>
            </div>
            <div className="weight row mb-3">
              <lable className="col-2">Weight ( in Kg. ):</lable>
              <input type="number" name="weight" onChange={handleInputChange} className="col-8"></input>
            </div>

            <div className="shipment-buttons">
              <button className="confirm-button btn btn-primary" onClick={handleOpen}>
                Confirm Shipment
              </button>
              <button
                onClick={backHandler}
                className="back-button btn btn-secondary"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
      <ToastContainer />
    </>
  );
};

export default AdminProcessOrder;
