
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelList from './HotelList.jsx';
import HotelDetail from './HotelDetails.jsx'
import { useHistory } from 'react-router-dom';
import RoomForm from './addhotel.jsx'
import LandingPage from './LandingPage.jsx';
import Signin from './Login.jsx';
import Signup from './Register.jsx';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HotelList />} />
        <Route path="/hotel/:roomID" element={<HotelDetail />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/landingPage" element={<LandingPage/>} />
        <Route path="/addroom" element={<RoomForm />} />
        <Route path="/login" element={<Signin />} />
      </Routes>
    </Router>
  );
}

export default App;