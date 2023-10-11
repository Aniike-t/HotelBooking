
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelList from './HotelList.jsx'; // Import your HotelList component
import HotelDetails from './HotelDetails.jsx'; // Import the HotelDetails component
import Signup from './Register.jsx';
import Login from './Login.jsx';
import { useHistory } from 'react-router-dom'; // Import useHistory
import RoomForm from './addhotel.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
        <Route path="/register" element={<Login />} />
        <Route path="/homepage" element={< Signup/>} />
        <Route path="/addroom" element={< RoomForm/>} />
      </Routes>
    </Router>
  );
}

export default App;