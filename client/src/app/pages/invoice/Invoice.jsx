import React, { useRef } from "react";
import "./Invoice.css";
import TafiLogo from "../../assets/Tafi_logo_white.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
const Invoice = () => {
  const pdfRef = useRef();
  const downloadPDF = () => {
    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 0;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      pdf.save("invoice.pdf");
    });
  };

  return (
    <>
      <div className="invoice-main" ref={pdfRef}>
        <div className="invoice-header">
          <div className="title">
            <h1>
              <img src={TafiLogo} />
            </h1>
          </div>
        </div>
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
            <div class="section-title">Invoice Details</div>
            <div class="details row">
              <p>Date: January 19, 2024</p>
              <p>Invoice Number: INV123456</p>
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
                  <th>Price (INR)</th>
                  <th>GST (%)</th>
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
                  <td>90.00</td>
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
      <div className="download-button">
        <button class="btn btn-primary" onClick={downloadPDF}>
          Download
        </button>
      </div>
    </>
  );
};

export default Invoice;
