import React from "react";
import Header from "../../pages/header/header";
import Footer from "../../pages/footer/footer";
import "./ReturnAndRefund.css";

const ReturnAndRefund = () => {
  return (
    <div>
      <Header />
      <div className="RnR">
        <div className="RnR-title">
          <h2>Return And Refund</h2>
        </div>
        <div className="RnR-body">
          <div className="RnR-1">
            <p>
              At TAFI, we prioritize your satisfaction with our products. Our
              Return and Refund Policy is designed to make the return process as
              simple and hassle-free as possible.
            </p>
            <p>
              You can return any product purchased from our official website
              within 30 days from the shipping date.
            </p>
            <p>
              Refunds will be processed within 5-7 working days from the date we
              receive the returned product. Please note that the actual refund
              timeline may vary depending on your payment method and financial
              institution.
            </p>
          </div>
          <div className="RnR-2">
            <h3>Refund Process:</h3>
            <h4>
              <ol>Full Refund (UPI/Credit Card/Debit Card):</ol>
            </h4>
            <p>
              <ul>
                For orders paid via UPI, Credit Card, or Debit Card, you are
                eligible for a full refund. The refund will be processed to the
                original payment method.
              </ul>
            </p>
            {/* <h4>
              <ol>Store Credit (Cash on Delivery):</ol>
            </h4>
            <p>
              <ol>
                If your order was paid via Cash on Delivery (COD), the refund
                will be issued in the form of RAER points or store credit, which
                can be used for future purchases on our website.
              </ol>
            </p> */}
          </div>
          <div className="RnR-3">
            <h3>Return Procedure:</h3>
            <p>
              <ul>Log in to your TAFI account on our official website.</ul>
            </p>
            <p>
              <ul>
                Go to the “Order History” section and select the order
                containing the item you wish to return.
              </ul>
            </p>
            <p>
              <ul>
                Click on the “Return Items” button and follow the on-screen
                instructions to complete the return process.
              </ul>
            </p>
          </div>
          <div className="RnR-4">
            <h3>Return Shipping:</h3>
            <p>
              There are no charges for return shipping. We want to ensure a
              convenient and cost-free return experience for our customers.
            </p>
          </div>
          <div className="RnR-5">
            <h3>Contact Information:</h3>
            <p>
              If you have any questions or concerns about our Return and Refund
              Policy, please reach out to our customer support team at
              support@twicks.in.
            </p>
            <p>
              TAFI reserves the right to update or modify this policy at any
              time without prior notice. We encourage our customers to review
              the policy periodically for any changes.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReturnAndRefund;
