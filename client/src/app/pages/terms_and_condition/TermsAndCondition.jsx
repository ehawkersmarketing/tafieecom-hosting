import React from "react";
import Header from "../../pages/header/header";
import Footer from "../../pages/footer/footer";
import "./TermsAndCondition.css";

const TermsAndConditions = () => {
  return (
    <>
      <Header />
      <div className="TnC">
        <div className="TnC-title">
          <h2>Terms and Conditions</h2>
        </div>
        <div className="TnCBody">
          <div className="TnCBody1">
            <p>
              These Terms and Conditions outline the rules and regulations for
              the use of our website. By accessing this website, you accept
              these terms and conditions.
            </p>
          </div>
          <div className="TnCBody2">
            <h4>Intellectual Property Rights:</h4>
            <p>
              The content and materials on this website, including text,
              graphics, logos, and images, are the property of TAFI and are
              protected by applicable copyright and trademark laws.
            </p>
          </div>
          <div className="TnCBody3">
            <h4>Use License:</h4>
            <p>
              Permission is granted to temporarily download one copy of the
              materials on TAFI's website for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a
              transfer of title.
            </p>
          </div>
          <div className="TnCBody4">
            <h4>Disclaimer:</h4>
            <p>
              The materials on TAFI's website are provided on an 'as is' basis.
              TAFI makes no warranties, expressed or implied, and hereby
              disclaims and negates all other warranties including, without
              limitation, implied warranties or conditions of merchantability,
              fitness for a particular purpose, or non-infringement of
              intellectual property or other violation of rights.
            </p>
          </div>
          <div className="TnCBody5">
            <h4>Limitations:</h4>
            <p>
              In no event shall TAFI or its suppliers be liable for any damages
              (including, without limitation, damages for loss of data or
              profit, or due to business interruption) arising out of the use or
              inability to use the materials on TAFI's website, even if TAFI or
              a TAFI authorized representative has been notified orally or in
              writing of the possibility of such damage.
            </p>
          </div>
          <div className="TnCBody6">
            <h4>Revisions:</h4>
            <p>
              TAFI does not warrant that any of the materials on its website are
              accurate, complete, or current. TAFI may make changes to the
              materials contained on its website at any time without notice.
            </p>
          </div>
          <div className="TnCBody7">
            <p>
              By using this website, you agree to abide by these terms and
              conditions. If you do not agree with any of these terms, please do
              not use our website.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
