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
const crypto = require('crypto');

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


const bookingsByUserSchema = new mongoose.Schema({
  username: String,
  owner: String,
  bookingID: {
    type: String,
    unique: true,
    required: true,
  },
  startDate: Date,
  endDate: Date,
  roomID: String,
  email: String,
  address: String,
  sellerphonenumber: Number,
});
const BookingsByUser = mongoose.model('BookingsByUser', bookingsByUserSchema);

const hotelBookingDataSchema = new mongoose.Schema({
  daysOccupied: {
    type: Number,
    default: 0,
  },
  bookedByUsername: {
    type: String,
    default: '',
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  accomodates: {
    type: Number,
    default: 1,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  }
});

app.get('/room-details/:roomID', async (req, res) => {
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

const roomSchema = new mongoose.Schema({
  roomID: {
    type: String,
    unique: true, 
    required: true, 
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
  latitude: Number, 
  longitude: Number,
  owner: String,
  bookings: [hotelBookingDataSchema],
  overallTotalCost: {
    type: Number,
    default: 0,
  },
});

app.post('/book-room/:roomID', async (req, res) => {
  const { roomID } = req.params;
  const { startDate, endDate, bookedByUsername, totalCost, daysOccupied,email } = req.body
  try {
    const room = await Room.findOne({ roomID });
    const newBooking = {
      startDate,
      endDate,
      bookedByUsername,
      totalCost,
      daysOccupied,
    };

    const uniqueBookingID = generateUniqueBookingID();
    console.log(uniqueBookingID)
    const userBooking = new BookingsByUser({
      roomID,
      username: bookedByUsername,
      owner: room.owner,
      bookingID: uniqueBookingID,
      startDate,
      endDate,
      email:email,
      address: room.address,
      sellerphonenumber: room.sellerphonenumber,
    });
    await userBooking.save();
    room.bookings.push(newBooking);
    room.overallTotalCost += totalCost;
    await room.save();
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Error booking the room:', error);
    res.status(500).json({ error: 'Booking failed' });
  }
});



app.get('/profile', async (req, res) => {
  const username = req.query.username;
  console.log(username)
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  const rooms = await Room.find({ owner: username });
  res.json({ username, rooms });
});

// Read hotel data from Mongo
app.get('/hotels', async (req, res) => {
  try {
    const roomsWithFirstPhotos = await Room.find({}, 'roomID id title price location categories rating photos').exec();

    const rooms = roomsWithFirstPhotos.map((room) => {
      return {
        roomID: room.roomID,
        id: room.id,
        title: room.title,
        price: room.price,
        location: room.location,
        categories: room.categories,
        rating: room.rating,
        photos: room.photos.length > 0 ? room.photos[0] : null, // Get the first photo
      };
    });

    console.log(rooms)
    res.json(rooms);
  } catch (error) {
    console.error('Error retrieving room data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/UserBookings', async (req, res) => {
    const username = req.query.username;
    console.log("Hi "+username)
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
    const userBookings = await BookingsByUser.find({ username });
    console.log(userBookings)
    res.json({ bookings: userBookings });
});


app.get('/hotel/:roomID', async (req, res) => {
  try {
    const requestedRoomID = req.params.roomID;
    const room = await Room.findOne(
      { roomID: requestedRoomID },
      ' -overallTotalCost -bookings.bookedByUsername -bookings.totalCost -bookings.accomodates -bookings.daysOccupied'
    ); 
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
  const { title, description, price, amenities, photos, location, sellerphonenumber,categories, address, latitude ,longitude, owner} = req.body;
  const room = new Room({ roomID: uniqueRoomID, title, description, price, amenities, photos, location, sellerphonenumber, categories, address,latitude ,longitude, owner });
  try {
    await room.save();
    res.json({ message: 'Room added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add room' });
  }
});

function generateUniqueBookingID() {
  const randomBuffer = crypto.randomBytes(10);
  const hexString = randomBuffer.toString('hex');
  const bookingID = hexString.slice(0, 20);
  return bookingID;
}



app.post('/check-credentials', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await user.findOne({ username, password });
    if (user) {
      return res.json({ success: true, message: 'Credentials are valid.' });
    }
    return res.json({ success: false, message: 'Invalid credentials.' });
  } catch (error) {
    console.error('Error checking credentials:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});
// Implement other routes as needed (e.g., for room data)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});