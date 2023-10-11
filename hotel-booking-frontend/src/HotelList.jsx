import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './hotellist.css';
import { Link } from 'react-router-dom';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

const HotelList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    axios.get('http://localhost:5000/hotels')
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.error('Error fetching hotel data:', error);
      });
  }, []);

  return (
    <div className="body">
      <div>
        <Header />
      </div>
      <div className="Headinglist">
        <div className="HeadingHotel">
        </div>
        <section className="category-section">
          {['Villa', 'Cottage', 'Condo', 'Apartment', 'House', 'Mansion'].map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </button>
          ))}
        </section>
        <div className="hotel-grid">
          {rooms
            .filter((room) => !selectedCategory || room.categories.includes(selectedCategory))
            .map((room) => (
              <div key={room.id} className="hotel-tile">
                <img id="imgcon" src={require("./assets/hotelimg.png")} alt="{`data:image/jpeg;base64,${room.image}`}" height={250}/>
                <h2>{room.name}</h2>
                <h2>Price: {room.price}/night</h2>
                <h4>Rating: {room.rating}</h4>
                <h4>Loaction: {room.location}</h4>
                <Link id='roomlink' to={`/hotel/${room.id}`}>Select Hotel</Link>
              </div>
            ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HotelList;
