import React from "react";
import Header from "../../pages/header/header";
import Footer from "../../pages/footer/footer";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div>
      <Header />
      <div className="pp">
        <div className="pp-title">
          <h2>Privacy Policy</h2>
        </div>
        <div className="pp-body">
          <div className="pp-1">
            <p>
              Thank you for choosing TAFI. This Privacy Policy is designed to
              help you understand how we collect, use, disclose, and safeguard
              your personal information when you visit our website or use our
              services.
            </p>
          </div>
          <div className="pp-2">
            <h3>Information We Collect:</h3>
            <h4>
              <ol>Personal Information:</ol>
            </h4>
            <p>
              <ul>
                When you register for our services, we may collect personal
                information such as your name, contact details, and address.
              </ul>
              <ul>
                Information provided when you communicate with us through email
                or other channels.
              </ul>
            </p>
            <h4>
              <ol>Usage Information:</ol>
            </h4>
            <p>
              <ul>
                We may collect data on how you interact with our website,
                including pages visited, time spent, and the actions taken.
              </ul>
            </p>
          </div>
          <div className="pp-3">
            <h3>How We Use Your Information:</h3>
            <h4>
              <ol>Service Provision:</ol>
            </h4>
            <p>
              <ul>
                To provide you with the requested services and information.
              </ul>
            </p>
            <h4>
              <ol>Communication:</ol>
            </h4>
            <p>
              <ul>
                To respond to your inquiries and communicate with you about our
                products and services.
              </ul>
            </p>
            <h4>
              <ol>Analytics:</ol>
            </h4>
            <p>
              <ul>
                To analyze website usage and improve our content and services.
              </ul>
            </p>
            <h4>
              <ol>Marketing:</ol>
            </h4>
            <p>
              <ul>
                With your consent, we may send you promotional materials about
                our products and services.
              </ul>
            </p>
          </div>
          <div className="pp-4">
            <h3>Information Sharing:</h3>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except for the
              purposes of delivering the requested services.
            </p>
          </div>
          <div className="pp-5">
            <h3>Security:</h3>
            <p>
              We employ industry-standard security measures to protect your
              personal information. However, no method of transmission over the
              internet or electronic storage is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </div>
          <div className="pp-6">
            <h3>Updates to this Privacy Policy:</h3>
            <p>
              We may update this Privacy Policy to reflect changes in our
              practices or for legal reasons. The latest version will be posted
              on our website.
            </p>
          </div>
          <div className="pp-7">
            <h3>Contact Us:</h3>
            <p>
              If you have any questions or concerns about this Privacy Policy,
              please contact us at support@twicks.in.
            </p>
            <p>
              By using our website, you agree to the terms of this Privacy
              Policy.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
