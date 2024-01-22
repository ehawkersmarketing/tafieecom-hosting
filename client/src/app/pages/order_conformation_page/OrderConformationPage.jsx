import React from 'react';

import './OrderConformationPage.css'
import tick_icon from '../../assets/tick_icon.png'
import { useFetch } from '../../hooks/api_hook';
import dayjs from 'dayjs';

const OrderConformationPage = () => {

  const { data } = useFetch('/api/getOrderById/65ab5ec34850f337a543d66f');

  return (
    <div className='main'>
      <div className='main-1 row align-items-end'>
        <div className="col-9">
          <div className='element row justify-content-between'>
            <div className='col-9'>
              <div className='title'><h2><strong>Thank you, your order has been placed</strong></h2></div>
              <div className='sub-title'><p><strong>The order confirmation has been sent to your email address</strong></p></div>
            </div>
            <div className='invoice-download col-3'>
              <button type="link"> <div><strong>Download<br />Invoice</strong></div><i class="bi bi-download"></i></button>
            </div>
          </div>
          <div className='details justify-content-between'>
            <div className='OrderDetails'>
              <div className='OrderDetails-text'>
                <h4><strong>Order Details:</strong></h4>
                <div className='row'>
                  <p className='col-5'>Order ID: </p>
                  <p className='col'>{data && data._id}</p>
                </div>
                <div className='row'>
                  <p className='col-5'>Order Total: </p>
                  <p className='col-7'>{data && `INR ${data.amount}`}</p>
                </div>
                <div className='row'>
                  <p className='col-5'>Date: </p>
                  <p className='col-7'>{data && dayjs(data.timestamps).format('MMM D, YYYY')}</p>
                </div>
                <div className='row'>
                  <p className='col-5'>Time: </p>
                  <p className='col-7'>{data && dayjs(data.timestamps).format('hh:mm A')}</p>
                </div>
              </div>
            </div>
            <div className='ShippingDetails'>
              <div className='ShippingDetails-text'>
                <h4><strong>Shipping Details:</strong></h4>
                <div className='row'>
                  <p className='col-5'>Name: </p>
                  <p className='col-7'>{data && data.user.userName}</p>
                </div>
                <div className='row'>
                  <p className='col-5'>Address: </p>
                  <p className='col-7'>{data && data.userAddress.street}</p>
                </div>
                <div className='row'>
                  <p className='col-5'>Pin: </p>
                  <p className='col-7'>{data && data.userAddress.zipCode}</p>
                </div>
                <div className='row'>
                  <p className='col-5'>Contact No. </p>
                  <p className='col-7'>{data && data.user.phone}</p>
                </div>
              </div>
            </div>
            <div className='BillingDetails'>
              <div className='BillingDetails-text'>
                <h4><strong>Billing Address:</strong></h4>
                <div className='row'>
                  <p className='col-5'>Address: </p>
                  <p className='col-7'>{data && data.userAddress.landmark}</p>
                </div>
                <div className='row'>
                  <p className='col-5'>Pin: </p>
                  <p className='col-7'>{data && data.userAddress.zipCode}</p>
                </div>
              </div>
            </div>
          </div>
        </div>



        <div className='status col-3'>
          <div>
            <img src={tick_icon} />
          </div>
        </div>
        <div className='order-link'>
          <a href=''>
            <button type="link"><strong>My Order</strong></button>
          </a>
        </div>
      </div>

      <div className='card-carousel-title'>
        <h2 className='recommended'>Recommended</h2>
        <h2 className='foryou'>For You</h2>
      </div>
      {/* <Carousal /> */}
    </div>
  );
}



export default OrderConformationPage;