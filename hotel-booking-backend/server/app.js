const express = require('express');
const cors = require('cors');
const mongoose =require('mongoose');
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userController = require('./userController');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());



// Signup route
app.post('/signup', userController.signup);

// Login route
app.post('/login', userController.login);


mongoose.connect('mongodb+srv://Aniket:Aryan7738@cluster0.w8e5wlw.mongodb.net/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find the user in your database using the provided 'username'
      const user = await User.findOne({ email: username });

      // If the user is not found, return an error
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }

      // Check if the provided 'password' matches the user's password
      const passwordMatch = await user.comparePassword(password);

      // If the password doesn't match, return an error
      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password' });
      }

      // If the user and password are valid, return the user object
      return done(null, user);
    } catch (error) {
      // If an error occurs during authentication, return the error
      return done(error);
    }
  })
);




const roomSchema = new mongoose.Schema({
  roomID: {
    type: String, // or Number, depending on your preferences
    unique: true, // Ensures uniqueness of roomIDs
    required: true, // Requires a roomID for each document
  },
  title: String,
  description: String,
  price: Number,
  amenities: [String],
  photos: [String],
  location: String,
  sellerphonenumber: Number,
  rating: {
    type: Number,
    default: 0,
  },
  categories: [String],
  address: String,
});



// Read hotel data from Mongo
app.get('/hotels', async (req, res) => {
  try {
    const rooms = await Room.find({}, 'roomID id title price location categories rating').exec();
    console.log(rooms)
    res.json(rooms);
  } catch (error) {
    console.error('Error retrieving room data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/hotel/:roomID', async (req, res) => {
  try {
    const requestedRoomID = req.params.roomID;
    const room = await Room.findOne({ roomID: requestedRoomID });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    res.json(room);
  } catch (error) {
    console.error('Error retrieving room data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


function generateUniqueRoomID() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = 6;
  let roomID = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    roomID += characters[randomIndex];
  }
  return roomID;
}

const Room = mongoose.model('Room', roomSchema);
app.post('/roomsadd', async (req, res) => {
  const uniqueRoomID = generateUniqueRoomID();
  console.log(req.body);
  const { title, description, price, amenities, photos, location, sellerphonenumber,categories, address } = req.body;
  const room = new Room({ roomID: uniqueRoomID, title, description, price, amenities, photos, location, sellerphonenumber, categories, address });
  try {
    await room.save();
    res.json({ message: 'Room added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add room' });
  }
});


// Implement other routes as needed (e.g., for room data)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});