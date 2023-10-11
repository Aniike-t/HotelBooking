import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Hoteldetails.css';
import Header from './components/header';
import Footer from './components/footer';

const RoomDetail = () => {
  const [room, setRoom] = useState(null);
  const { roomID } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/hotel/${roomID}`)
      .then((response) => {
        console.log(response.data); // Log the response data
        setRoom(response.data);
      })
      .catch((error) => {
        console.error('Error fetching room data:', error);
      });
  }, [roomID]);

  return (
    <div>
    <div>
      <Header />
    </div>
      <div className="room-details">
        {room ? (
          <div>
            <h1 className="room-title">{room.title}</h1>
            <p className="room-description">Desciption by owner : {room.description}</p>
            <p className="room-price">Price: ${room.price} per night</p>
            <p className="room-rating">Rating: {room.rating}</p>
            <p className="room-location">Location: {room.location}</p>
            <p className="room-seller-phone">Seller Phone Number: {room.sellerphonenumber}</p>
            <p className="room-address">Address: {room.address}</p>
            <h3 className="room-amenities">Amenities:</h3>
            <ul className="amenities-list">
              {room.amenities.map((amenity, index) => (
                <li className="amenity-item" key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="loading-message">Loading...</p>
        )}
      </div>
      <div>
          <Footer />
      </div>
      </div>
  );
};

export default RoomDetail;
