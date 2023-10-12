
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelList from './HotelList.jsx'; // Import your HotelList component
import HotelDetail from './HotelDetails.jsx'
import Signup from './Register.jsx';
import Login from './Login.jsx';
import { useHistory } from 'react-router-dom'; // Import useHistory
import RoomForm from './addhotel.jsx'
import LandingPage from './LandingPage.jsx';
//<Route path="/homepage" element={< LandingPage/>} />

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:roomID" element={<HotelDetail />} />
        <Route path="/register" element={<Login />} />
        <Route path='/landingPage' element={<LandingPage/>}></Route>
        <Route path="/addroom" element={< RoomForm/>} />
      </Routes>
    </Router>
  );
}

export default App;