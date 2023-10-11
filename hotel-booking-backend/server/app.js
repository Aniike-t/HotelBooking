const express = require('express');
const cors = require('cors');
const excel = require('exceljs');
const mongoose =require('mongoose');
const app = express();
const port = 5000;
const bcrypt = require('bcrypt');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://Aniket:Aryan7738@cluster0.w8e5wlw.mongodb.net/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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



// Read hotel data from Excel file
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





const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  // Check if the username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    return res.status(400).json({ message: 'Username or email already exists' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user document and save it to MongoDB
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();
  res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Incorrect password' });
  }
  res.json({ message: 'Login successful' });
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