// RoomForm.js
import React, { useState,useEffect } from 'react';
import './AddHotel.css';
import Header from './components/header';
import Footer from './components/footer';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const center = {
  lat: -3.745,
  lng: -38.523
};


const RoomForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    amenities: [],
    photos: [],
    location: '',
    sellerphonenumber:'',
    categories: [],
    address:'',
  });
  

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAqpVVN3RLo2hb_Q0T4ZjFpZURRK9-AnGg" // Replace with your Google Maps API key
  });

  const [map, setMap] = useState(null);


  const onLoad = React.useCallback(function callback(map) {
    setMap(map);

    // Once the map is loaded, you can call fitBounds
    if (map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    }
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  if (loadError) {
    console.error('Error loading Google Maps:', loadError);
  }


  const handleCategoryChange = (e) => {
    const { name, value, checked } = e.target;
  
    if (checked) {
      // If the category is checked, add it to the form data
      setFormData({
        ...formData,
        [name]: [...formData[name], value],
      });
    } else {
      // If the category is unchecked, remove it from the form data
      setFormData({
        ...formData,
        [name]: formData[name].filter((item) => item !== value),
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [successMessage, setSuccessMessage] = useState(null);

  const handleAmenitiesChange = (e) => {
    const { name, value } = e.target;
    const updatedAmenities = formData.amenities.slice();
    if (e.target.checked) {
      updatedAmenities.push(value);
    } else {
      const index = updatedAmenities.indexOf(value);
      if (index !== -1) {
        updatedAmenities.splice(index, 1);
      }
    }
    setFormData({ ...formData, amenities: updatedAmenities });
  };

  const handlePhotoChange = (e) => {
    const photos = e.target.files;
    const photoUrls = Array.from(photos).map((photo) => URL.createObjectURL(photo));
    setFormData({ ...formData, photos: photoUrls });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/roomsadd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      alert(response.data.message);

      if (response.ok) {
        console.log('Room added successfully');

      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='AddHotelCon'>
    <div>
        <Header />
    </div>
    <form onSubmit={handleSubmit} className="room-form">
    <h1>Rent Your Room</h1>
    <input
        type="text"
        name="title"
        placeholder="Room Name"
        value={formData.title}
        onChange={handleChange}
        className="room-input"
    />
    <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="room-input"
    />
        <textarea
        name="address"
        placeholder="Room's Address"
        value={formData.address}
        onChange={handleChange}
        className="room-input"
    />
    <input
        type="number"
        name="price"
        placeholder="Price/Day"
        value={formData.price}
        onChange={handleChange}
        className="room-input"
    />
    <div className='seller-section'>
        <h3>Seller Details</h3>
        <input
        type="number"
        name="sellerphonenumber"
        placeholder="Phone Number"
        value={formData.sellerphonenumber}
        onChange={handleChange}
        className="room-input"
    />
    </div>
    <div className="amenities-section">
        <h3>Amenities</h3>
        <label className="amenity-label">
        <input
            type="checkbox"
            name="amenities"
            value="Wi-Fi"
            onChange={handleAmenitiesChange}
            className="amenity-checkbox"
        /> Wi-Fi
        </label>
        <label className="amenity-label">
        <input
            type="checkbox"
            name="amenities"
            value="TV"
            onChange={handleAmenitiesChange}
            className="amenity-checkbox"
        /> TV
        </label>
        {/* Add more amenities checkboxes */}
    </div>
    <div className="photo-section">
        <h3>Upload Photos</h3>
        <input
        type="file"
        name="photos"
        multiple
        onChange={handlePhotoChange}
        className="photo-input"
        />
        <div className="photo-preview">
        {formData.photos.map((photo, index) => (
            <img
            key={index}
            src={photo}
            alt={`Room Photo ${index + 1}`}
            className="photo-thumbnail"
            />
        ))}
        </div>
    </div>
        <div className="category-section">
    <h3>Category</h3>
    <label className="category-label">
        <input
        type="checkbox"
        name="categories"
        value="Apartment"
        onChange={handleCategoryChange}
        />
        Apartment 
    </label>    <br />
    <label className="category-label">
        <input
        type="checkbox"
        name="categories"
        value="House"
        onChange={handleCategoryChange}
        />
        House
    </label>     <br />
    <label className="category-label">
        <input
        type="checkbox"
        name="categories"
        value="Condo"
        onChange={handleCategoryChange}
        />
        Condo
    </label><br />
    <label className="category-label">
        <input
        type="checkbox"
        name="categories"
        value="Cottage"
        onChange={handleCategoryChange}
        />
        Cottage
    </label><br />
    <label className="category-label">
        <input
        type="checkbox"
        name="categories"
        value="Villa"
        onChange={handleCategoryChange}
        />
        Villa
    </label><br />
    <label className="category-label">
        <input
        type="checkbox"
        name="categories"
        value="Mansion"
        onChange={handleCategoryChange}
        />
        Mansion
    </label><br />
    {/* Add more category checkboxes as needed */}
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <div>
    <h3>Location</h3>
    <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        className="room-input"
    />
    </div>
    {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
        >
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      ) : (
        <p>Loading Map...</p>
      )}

    <button type="submit" className="submit-button">Add Room</button>
    </form>
    <div>
        <Footer />
    </div>
    </div>
  );
};

export default RoomForm;
