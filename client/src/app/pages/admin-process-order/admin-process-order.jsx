import React, { useState } from "react";
import "./admin-process-order.css";
import TafiLogo from "../../assets/Tafi_logo_white.png";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useNavigate } from "react-router-dom";

const AdminProcessOrder = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const acceptHandler = () => setValue(1);
  const backHandler = () => setValue(0);
  const dashboardHandler = () =>{
    navigate("/adminPage")
  }
  return (
    <>
      <Header />
      <div className="admin-process-main">
        <div className="user-details row">
          <div class="section col-6">
            <div class="section-title">Buyer Information</div>
            <div class="details row">
              <p>Name: John Doe</p>
              <p>Email: john@example.com</p>
              <p>Phone: +1 123-456-7890</p>
            </div>
          </div>
          <div class="section col-6">
            <div class="section-title">Billing To</div>
            <div class="details row">
              <p>Address: 456 Billing Street</p>
              <p>Pin:</p>
              <p>City: Billing City</p>
            </div>
          </div>
          <div class="section col-6">
            <div class="section-title">Shipping To</div>
            <div class="details row">
              <p>Address: 123 Shipping Street</p>
              <p>Pin: Shipping Pin</p>
              <p>City: Shipping City</p>
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
                <tr>
                  <td>1</td>
                  <td>Fertilizer</td>
                  <td>1234</td>
                  <td>1</td>
                  <td>500.00</td>

                  <td>590</td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td>Total Gross</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>

                  <td>590</td>
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
      {value == 0 && (
        <div className="accept-reject-button">
          <button
            type="button"
            class="btn btn-primary accept-button m-2"
            onClick={acceptHandler}
          >
            Accept
          </button>
          <button type="button" class="btn btn-secondary reject-button m-2">
            Reject
          </button>
        </div>
      )}
      {value == 1 && (
        <div className="table-for-input">
          <hr />
          <h5 className="mt-2">
            Please enter below details to process shipment
          </h5>
          <div className="input-table">
            <div className="height row mb-3">
              <lable className="col-2">Height :</lable>
              <input type="tel" name="height" className="col-8"></input>
            </div>
            <div className="length row mb-3">
              <lable className="col-2">Length :</lable>
              <input type="tel" name="length" className="col-8"></input>
            </div>
            <div className="breadth row mb-3">
              <lable className="col-2">Breadth :</lable>
              <input type="tel" name="breadth" className="col-8"></input>
            </div>
            <div className="weight row mb-3">
              <lable className="col-2">Weight :</lable>
              <input type="tel" name="weight" className="col-8"></input>
            </div>

            <div className="shipment-buttons">
              <button className="confirm-button btn btn-primary" onClick={dashboardHandler}>
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
    </>
  );
};

export default AdminProcessOrder;
