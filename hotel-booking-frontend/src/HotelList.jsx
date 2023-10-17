import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './hotellist.css';
import { Link } from 'react-router-dom';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import 'bootstrap/dist/css/bootstrap.css';

const HotelList = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  
  const handleCategoryClick = (category) => {
    console.log('Selected category:', category);
    setSelectedCategory(category);
  };
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Retrieve the username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);



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
      <div>
        {username && <p>Welcome, {username}!</p>}
      </div>
        <Header />
      </div>
      <div className="Headinglist">
        <div className="HeadingHotel">
        </div>
        <section id="sectionnavbar" className="category-section">
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
              {rooms.length > 0 ? (
                rooms.filter((room) => !selectedCategory || room.categories.includes(selectedCategory)).map((room) => (
                  <div key={room.id} >
                  <div >
                    <div id="cardborder0shadow" className="card border-0 shadow">
                      <img
                        id="imgcon"
                        src={require("./assets/hotelimg.png")}
                        alt="{`data:image/jpeg;base64,${room.image}`}"
                        height={250}
                      />
                      <h2 id="heading2">Price: {room.price}/night</h2>
                      <h4 id="heading3">Rating: {room.rating}</h4>
                      <h4 id="heading3">Location: {room.location}</h4>
                      <Link id="roomlink" to={`/hotel/${room.roomID}`}>Book Now
                      </Link>
                    </div>
                  </div>
                </div>
                ))
              ) : (
                // Loading skeleton for each room
                [...Array(4)].map((_, index) => (
                  <div className="hotel-grid">
                  <div id="cardborder0shadow" className="card border-0 shadow">
                      <div class="movie--isloading">
                        <div class="loading-image"></div>
                        <div class="loading-content">
                          <div class="loading-text-container">
                            <div class="loading-main-text"></div>
                            <div class="loading-sub-text"></div>
                          </div>
                          <div class="loading-btn"></div>
                        </div>
                      </div>
                </div>
                </div>
                ))
              )}
            </div>

      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default HotelList;
