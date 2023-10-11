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
    const rooms = await Room.find({}, 'id title price location categories rating').exec();
    console.log(rooms)
    res.json(rooms);
  } catch (error) {
    console.error('Error retrieving room data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/hotels/:id', (req, res) => {
  const { id } = req.params;
  const workbook = new excel.Workbook();

  workbook.xlsx.readFile('hotel-database.xlsx')
    .then((workbook) => {
      const worksheet = workbook.getWorksheet(1);
      let hotelData = null;

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) { // Skip the header row
          const hotelId = row.getCell(1).value;
          if (hotelId.toString() === id.toString()) { // Compare as strings
            hotelData = {
              id: row.getCell(1).value,
              name: row.getCell(2).value,
              price: row.getCell(3).value,
              availability: row.getCell(5).value,
              rating: row.getCell(7).value,
            };
          }
        }
      });

      if (hotelData) {
        res.json(hotelData);
      } else {
        res.status(404).json({ error: 'Hotel not found' });
      }
    })
    .catch((error) => {
      console.error('Error reading Excel file:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    });
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



const Room = mongoose.model('Room', roomSchema);
app.post('/roomsadd', async (req, res) => {
  console.log(req.body);
  const { title, description, price, amenities, photos, location, sellerphonenumber,categories, address } = req.body;
  const room = new Room({ title, description, price, amenities, photos, location, sellerphonenumber,categories,address });
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