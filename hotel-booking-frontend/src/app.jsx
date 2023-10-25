
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HotelList from './HotelList.jsx';
import HotelDetail from './HotelDetails.jsx'
import RoomForm from './addhotel.jsx'
import LandingPage from './LandingPage.jsx';
import Signin from './Login.jsx';
import Signup from './Register.jsx';
import GlbViewer from './components/RotatingRoom.jsx';
import ProfilePage from './profile.jsx';
import BookingPage from './BookingPage.jsx';
import FeedbackForm from './Feedback.jsx';

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
        <Route path="/rotatingModel" element={<GlbViewer />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/book/:roomID/:checkIn/:checkOut" element={<BookingPage />} />
        <Route path="/feedback/:roomID" element={<FeedbackForm />} />
      </Routes>
    </Router>
  );
}

export default App;