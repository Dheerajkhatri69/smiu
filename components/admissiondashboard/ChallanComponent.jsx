"use client";

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Logo } from "../Logo/Logo";
import { Button } from "@/components/ui/button";
const ChallanComponent = React.forwardRef((props, ref) => (
  <div
    ref={ref}
    style={{
      width: "700px",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      position: "absolute", // Keep it off-screen
      top: "-10000px", // Move out of view
      left: "-10000px", // Move out of view
    }}
  >
    {/* Header */}
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
      <div>
        <Logo size={150} />
        <h2 style={{ margin: "0", fontSize: "20px" }}>SMI University</h2>
        <p style={{ margin: "0", fontSize: "14px" }}>1885</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <p style={{ margin: "0", fontWeight: "bold" }}>Student Copy</p>
        <p style={{ margin: "0" }}>Fall 2024</p>
        <p style={{ margin: "0" }}>Valid Date: 29/07/2024</p>
      </div>
    </div>

    {/* Bill Info */}
    <div style={{ border: "1px solid black", padding: "10px", marginBottom: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ margin: "0" }}>1 Bill</p>
        <p style={{ margin: "0" }}>Challan#: 100102720</p>
      </div>
      <p style={{ margin: "0" }}>ID#: 1001145080100</p>
    </div>

    {/* Student Info */}
    <div style={{ marginBottom: "20px" }}>
      <p style={{ margin: "5px 0" }}>
        <strong>Student ID:</strong> {props.cnic}
      </p>
      <p style={{ margin: "5px 0" }}>
        <strong>Student Name:</strong> {props.name}
      </p>
      <p style={{ margin: "5px 0" }}>
        <strong>Email:</strong> {props.email}
      </p>
      <p style={{ margin: "5px 0" }}>
        <strong>Program:</strong> {props.program}
      </p>
    </div>

    {/* Fee Table */}
    <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>Particulars</th>
          <th style={{ border: "1px solid black", padding: "8px", textAlign: "right" }}>Fee</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid black", padding: "8px" }}>Application Processing Fee</td>
          <td style={{ border: "1px solid black", padding: "8px", textAlign: "right" }}>2000</td>
        </tr>
        <tr>
          <td style={{ border: "1px solid black", padding: "8px" }}>Total Amount</td>
          <td style={{ border: "1px solid black", padding: "8px", textAlign: "right" }}>2060</td>
        </tr>
      </tbody>
    </table>

    {/* In Words */}
    <p style={{ marginBottom: "20px" }}>
      <strong>In words:</strong> Two Thousand and Sixty Rupees only
    </p>
    <p style={{ fontSize: "12px", marginBottom: "20px" }}>
      <strong>Note:</strong> Bank transaction fee Rs.60/- included.
    </p>

    {/* Payment Instructions */}
    <div style={{ marginBottom: "20px" }}>
      <h4 style={{ marginBottom: "10px" }}>Payment Instructions</h4>
      <ul style={{ margin: "0", paddingLeft: "20px", fontSize: "14px" }}>
        <li>
          Select the 1-Bill option from your Mobile App / Easy Paisa / Jazz Cash or any ATM and enter your 1 Bill ID.
        </li>
        <li>IBFT/Fund Transfer or Counter payment is NOT accepted.</li>
      </ul>
    </div>

    {/* Signatures */}
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "14px" }}>
      <p>Sign Officer</p>
      <p>Sign Cashier</p>
    </div>
  </div>
));

const ChallanComponentAPP = (props) => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const element = printRef.current;

    // Temporarily make the element visible for capturing
    element.style.position = "static";
    element.style.top = "0";
    element.style.left = "0";

    html2canvas(element, { scale: 1 }) // Reduce scale to lower resolution
      .then((canvas) => {
        const imgData = canvas.toDataURL("image/jpeg", 0.8); // Convert to JPEG with compression
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = 210; // A4 width in mm
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST"); // Compress further
        pdf.save("Challan.pdf");

        // Hide the element again after capturing
        element.style.position = "absolute";
        element.style.top = "-10000px";
        element.style.left = "-10000px";
      })
      .catch((error) => console.error("Error generating PDF:", error));
  };

  return (
    <div>
      {/* Hidden Component */}
      <ChallanComponent ref={printRef} name={props.name} email={props.email} cnic={props.cnic} program={props.program} />

      {/* Button to generate PDF */}
      <Button onClick={handlePrint} variant="secondary" className="bg-green-400">
        Download Fee Voucher
      </Button>
    </div>
  );
};

export default ChallanComponentAPP;
