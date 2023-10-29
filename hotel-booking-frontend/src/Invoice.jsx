
import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Invoice = () => {
    const { bookingID } = useParams();
    const [pdfData, setPdfData] = useState(null);
    const [invoiceData, setInvoiceData] = useState(null);
  
    useEffect(() => {
        downloadInvoice();
    }, [bookingID]);
  
    const downloadInvoice = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/invoicePDF/${bookingID}`, { responseType: 'blob' });
        const url = window.URL.createObjectURL(new Blob([response.data]));
        setPdfData(url);
      } catch (error) {
        console.error('Error downloading invoice:', error);
      }
  
      try {
        // Fetch additional data from the database based on bookingID
        const response = await axios.get(`http://localhost:5000/InvoiceInfo/${bookingID}`);
        setInvoiceData(response.data);
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };

  return (
    <div>
      <h2>Invoice Page</h2>
      <button onClick={downloadInvoice}>Download Invoice</button>
      {invoiceData && (
        <div>
          <p>Booking ID: {invoiceData.bookingID}</p>
          <p>Start Date: {invoiceData.startDate}</p>
          <p>End Date: {invoiceData.endDate}</p>
          <p>Address: {invoiceData.address}</p>
          <p>Seller Phone Number: {invoiceData.sellerphonenumber}</p>
        </div>
      )}
      {pdfData && <embed src={pdfData} type="application/pdf" width="100%" height="500px" />}
    </div>
  );
};

export default Invoice;
