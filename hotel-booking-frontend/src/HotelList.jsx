import React, { useState, useEffect} from 'react';
import axios from 'axios';
import './hotellist.css'
import { Link } from 'react-router-dom';  // Import useNavigate


const HotelList = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/hotels') // Replace with your backend URL
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching hotel data:', error);
      });
  }, []);


  return (  
        <div>
            <div className='HeadingHotel'>
                <h1>Hotel Booking</h1>
                </div>
        <div className="hotel-grid">  
        {hotels.map((hotel) => (
            <div key={hotel.id} className="hotel-tile">
            <h2>{hotel.name}</h2>
            <h2>Price :{hotel.price}/night</h2>
            <h4>Rating :{hotel.rating}</h4>
            <h4>Availability :{hotel.availability}</h4>
            <Link to={`/hotel/${hotel.id}`}>Select Hotel</Link>
            </div>
        ))}
        </div>
        </div>
  );
};

export default HotelList;
