import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header  from './components/header';

const HotelDetails = () => {
  const { id } = useParams(); // Get the hotel ID from the URL parameter
  const [hotel, setHotel] = useState(null);
  console.log(id);

  useEffect(() => {
    // Fetch hotel details based on the 'id' parameter
    axios.get(`http://localhost:5000/hotels/${id}`) // Replace with your backend URL
      .then((response) => {
        setHotel(response.data);
      })
      .catch((error) => {
        console.error('Error fetching hotel details:', error);
      });
  }, [id]); // Include 'id' as a dependency to re-fetch when the URL parameter changes

  if (!hotel) {
    // Loading indicator or error handling can be added here
    return <div>Loading...</div>;
  }

  return (
    <div >
      <div>
        <Header/>
      </div>
      <div>
        <h1>Hotel Details</h1>
        <h2>Name: {hotel.name}</h2>
        <h4>Price: {hotel.price}/night</h4>
        <h4>Rating: {hotel.rating}</h4>
        <h4>Availability: {hotel.availability}</h4>
        {/* Add more hotel details as needed */}
      </div>
    </div>
  );
};

export default HotelDetails;
