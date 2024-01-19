import React from 'react';

import './OrderConformationPage.css'
import tick_icon from '../../assets/tick_icon.png'

const OrderConformationPage = () => {
  return(
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
                    <p className='col-7'>123456789</p>
                  </div>
                  <div className='row'>
                    <p className='col-5'>Order Total: </p>
                    <p className='col-7'>INR 2500</p>
                  </div>
                  <div className='row'>
                    <p className='col-5'>Date: </p>
                    <p className='col-7'>11-12-2023</p>
                  </div>
                  <div className='row'>
                    <p className='col-5'>Time: </p>
                    <p className='col-7'>01 : 10 AM</p>
                  </div>
                </div>
              </div>
              <div className='ShippingDetails'>
                <div className='ShippingDetails-text'>
                  <h4><strong>Shipping Details:</strong></h4>
                  <div className='row'>
                    <p className='col-5'>Name: </p>
                    <p className='col-7'>Jalaj Tiwari</p>
                  </div>
                  <div className='row'>
                    <p className='col-5'>Address: </p>
                    <p className='col-7'>Anurag Nagar, part 2</p>
                  </div>
                  <div className='row'>
                    <p className='col-5'>Pin: </p>
                    <p className='col-7'>452010</p>
                  </div>
                  <div className='row'>
                    <p className='col-5'>Contact No. </p>
                    <p className='col-7'>8779966552</p>
                  </div>
                </div>
              </div>
              <div className='BillingDetails'>
                <div className='BillingDetails-text'>
                  <h4><strong>Billing Address:</strong></h4>
                  <div className='row'>
                    <p className='col-5'>Address: </p>
                    <p className='col-7'>Anurag Nagar, part 2</p>
                  </div>
                  <div className='row'>
                    <p className='col-5'>Pin: </p>
                    <p className='col-7'>452010</p>
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
    </div>
  );
}
  
 

export default OrderConformationPage;