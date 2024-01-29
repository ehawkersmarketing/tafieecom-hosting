import React, { useRef, useState, useEffect } from "react";
import "./invoice.css";
import { useFetch } from "../../hooks/api_hook";
import TafiLogo from "../../assets/Tafi_logo_white.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";

const Invoice = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data: order } = useFetch(`/api/getOrderById/${id}`);
    const products = order?.products;
    const user = JSON.parse(localStorage.getItem('user'))

    useEffect(() => {
        if (!user) {
            navigate('auth/login')
        }
    }, [order]);

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
                            <p>Name: {order?.user.userName}</p>
                            <p>Email: {order?.user.email}</p>
                            <p>Phone: +91 {order?.user.phone}</p>
                        </div>
                    </div>
                    <div class="section col-6">
                        <div class="section-title">Invoice Details</div>
                        <div class="details row">
                            <p>Date: {dayjs(order?.timestamps).format('MMM D, YYYY')}</p>
                            <p>Invoice Number: {order?.transactionId}</p>
                        </div>
                    </div>
                    <div class="section col-6">
                        <div class="section-title">Billing To</div>
                        <div class="details row">
                            <p>Address: {order?.userAddress.street}</p>
                            <p>City: {order?.userAddress.city}</p>
                            <p>Pin: {order?.userAddress.zipCode}</p>
                        </div>
                    </div>
                    <div class="section col-6">
                        <div class="section-title">Shipping To</div>
                        <div class="details row">
                            <p>Address: {order?.userAddress.street}</p>
                            <p>City: {order?.userAddress.city}</p>
                            <p>Pin: {order?.userAddress.zipCode}</p>
                        </div>
                    </div>
                    <div className="table-details">
                        <table>
                            <thead>
                                <tr>
                                    <th>Serial No.</th>
                                    <th>Product Name</th>
                                    <th>Quantity</th>
                                    <th>Price (INR)<p>(inclusive of taxes)</p></th>

                                    <th>Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products && products.map((item, index) => {
                                        return (
                                            <tr className="table-row" key={index}>
                                                <td>{index + 1}</td>
                                                <td>{item.productId?.title}</td>
                                                <td>{item.units}</td>
                                                <td>{(item.productId?.price)?.toLocaleString("en-IN")}</td>
                                                <td>{(item.productId?.price * item?.units)?.toLocaleString("en-IN")}</td>
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
                                    <td>{(order?.shipment_charge)?.toLocaleString("en-IN")}</td>
                                </tr>
                                <tr>
                                    <td>Total Gross</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>{(order?.amount + order?.shipment_charge)?.toLocaleString("en-IN")}</td>
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
                <div className="download-button">
                    <button class="btn btn-primary" onClick={downloadPDF}>
                        Download
                    </button>
                </div>
            </div>
        </>
    );
};

export default Invoice;