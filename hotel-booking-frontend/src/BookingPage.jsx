import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router-dom';
import Header from './components/header';
import './BookingPage.css';

const BookingPage = () => {
  const [username, setUsername] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const { roomID, checkIn, checkOut } = useParams();
  const [roomPrice, setRoomPrice] = useState(0);
  const selectedCheckInDate = new Date(checkIn);
  const selectedCheckOutDate = new Date(checkOut);
  const [roomData, setRoomData] = useState({});
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/room-details/${roomID}`);
        setRoomData(response.data);
        setRoomPrice(response.data.price)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching room details:', error);
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [roomID]);

  if (loading) {
    return <p>Loading...</p>;
  }
  const calculateTotalPrice = () => {
    if (selectedCheckInDate && selectedCheckOutDate) {
      const timeDiff = selectedCheckOutDate.getTime() - selectedCheckInDate.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      const totalPrice = nights * roomPrice;
      return totalPrice;
    }
    return 0;
  };
  const calculateDays = () => {
    if (selectedCheckInDate && selectedCheckOutDate) {
      const timeDiff = selectedCheckOutDate.getTime() - selectedCheckInDate.getTime();
      return Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    }
    return 0;
  };

  const handleConfirmBooking = () => {
    const bookingData = {
      startDate: selectedCheckInDate,
      endDate: selectedCheckOutDate,
      bookedByUsername: username,
      totalCost: calculateTotalPrice(),
      daysOccupied: calculateDays(),
      email: email,
      owner: roomData.owner
    };
    console.log(bookingData)
    axios.post(`http://localhost:5000/book-room/${roomID}`, bookingData)
      .then((response) => {
        console.log('Booking confirmed:', response.data);
        setBookingConfirmed(true);
      })
      .catch((error) => {
        console.error('Error confirming booking:', error);
      });
  };
  const isEmailValid = email.length > 0;
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>    
    <Header/>
    <div style={{width:"70vw", marginLeft:"15vw" }}>
      <div>
        <h2 style={{fontWeight:"700", marginTop:"10vh", marginBottom:"-5vh"}}>Confirm And Pay</h2>
      </div>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, marginRight: '20px',marginTop:"14vh" }}>
          <h4> <b>Hotel Name : {roomData.title}</b> </h4>
          <hr />
          <h5 style={{fontWeight:"600"}}>Your Holidays</h5>
          <p>From {selectedCheckInDate.toDateString()} to {selectedCheckOutDate.toDateString()}</p>
          <hr></hr>
          <h5 style={{fontWeight:"600"}}>Enter Email For Invoice</h5>
          <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              style={{padding:"5px", outline:"none", border:"0px", borderRadius:"10px"}}
            />
        </div>

        <div style={{ flex: 1 }}>
          <div className="InvoiceCon" style={{width:"70%", marginTop:"10vh", border:"0px", borderRadius:"15px", backgroundColor:'white'  }}>
            <h4 style={{fontWeight:"700"}}>Price Details</h4>
            <hr></hr>
            <h6> <b>Price/Night -</b>  Rs. {roomPrice} </h6>
            <h6> <b>Total Stay &nbsp; -</b>  {calculateDays()} Days </h6>
            <h6> <b>Total Cost  &nbsp; -</b>  Rs. {calculateTotalPrice()} </h6>
            <hr></hr>
            <h6> <b>Service Charge &nbsp;-</b>  Rs. 400</h6>
            <h6> <b>Payable Amount -</b>  Rs. {calculateTotalPrice()+200}</h6>
            <p style={{fontSize:"10px", color:"#FF5252"}}>Taxes may apply at payment</p>
            <hr></hr>

            { isEmailValid ?(
              <button onClick={handleConfirmBooking} style={{width:"100%", border:"0px", padding:"5px"}} >Confirm Booking</button>
            ):(
              <button onClick={handleConfirmBooking} style={{width:"100%", border:"0px", padding:"5px" }} disabled >Confirm Booking</button>
            )

            }
            
          </div>
        </div>
      </div>
    </div>
    </>

  );
}

export default BookingPage;
