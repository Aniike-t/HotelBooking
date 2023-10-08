
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelList from './HotelList.jsx'; // Import your HotelList component
import HotelDetails from './HotelDetails.jsx'; // Import the HotelDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:id" element={<HotelDetails />} />
      </Routes>
    </Router>
  );
}

export default App;