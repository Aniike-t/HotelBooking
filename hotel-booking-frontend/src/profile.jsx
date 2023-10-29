import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You can use Axios to make HTTP requests
import Header from './components/header';
import { Link } from 'react-router-dom';
import './profile.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [username, setUsername] = useState('');
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (username) {
      axios.get(`http://localhost:5000/profile?username=${username}`)
        .then((response) => {
          setRooms(response.data.rooms);
          console.log(rooms);
        })
        .catch((error) => {
          console.error('Error fetching user profile data:', error);
        });
    }
  }, [username]);

  useEffect(() => {
    axios.get(`http://localhost:5000/UserBookings?username=${username}`)
      .then((response) => {
        setBookings(response.data.bookings);
      })
      .catch((error) => {
        console.error('Error fetching user bookings:', error);
      });
  }, [username]);

  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{width:"70vw" , marginLeft:"15vw" }}>
        <h1 style={{textAlign:"left", fontSize:"36px", padding:"10px", marginLeft:"20px",marginTop:"20px"}}>Welcome, {username}!</h1>
        <hr></hr>
        <div style={{ display: 'flex',overflowX:"auto" }}>
            {bookings.length > 0 ? (
                <div>
                <h3 style={{textAlign:"left", fontSize:"25px", padding:"10px", marginLeft:"20px",marginTop:"20px"}}>Your Bookings</h3>
                <ul style={{ whiteSpace: 'nowrap' }}>
                    {bookings.map((booking) => (
                    <div className="yourbookingstile" key={booking.bookingID} style={{ display: 'inline-block', marginRight: '20px' }}>
                        <p> <b>Check-in:</b>  {booking.startDate}</p>
                        <p> <b>Check-out:</b>  {booking.endDate}</p>
                        <p> <b>Room Add:</b>  {booking.address}</p>
                        <p> <b>Seller Number:</b>  {booking.sellerphonenumber}</p>
                        <p> <b>Booking ID:</b>  {booking.bookingID}</p>
                        <p>{booking.roomID}</p>
                        <a href={`/invoice/${booking.bookingID}`} className="button-link">Give Feedback</a>
                        <a href={`/feedback/${booking.roomID}`} className="button-link">Give Feedback</a>
                    </div>
                    ))}
                </ul>
                </div>
            ) : (
                <h3 style={{textAlign:"left", fontSize:"25px", padding:"10px", marginLeft:"20px",marginTop:"20px"}}>No Bookings Found <br />Contact Us If Case Of Error </h3>
            )}
            </div>

        <hr></hr>
        <h3 style={{textAlign:"left", fontSize:"25px", padding:"10px", marginLeft:"20px",marginTop:"20px"}}>Your Hotels</h3>
        <div className="hotel-list" style={{ display: 'flex', overflowX: 'auto' }}>
        {rooms.map((room) => (
            <div key={room.roomID} className="roomtile" style={{ marginRight: '20px' }}>
            <img src={room.photos} alt={room.title} height={150} style={{borderRadius:"10px"}}/>
            <h4 style={{padding:"5px 10px ", fontWeight:"500"}}>{room.title}</h4>
            <Link id="roomlink1" to={`/hotel/${room.roomID}`} style={{ textAlign: 'start' }}>
                See Details
            </Link>
            <br />
            <Link id="roomlink1" to={`/hotel/${room.roomID}`} style={{ width: '100px' }}>
                See Insights
            </Link>
            <br />
            </div>
        ))}
        </div>


      </div>
    </div>
  );
};

export default ProfilePage;
