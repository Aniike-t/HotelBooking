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



// Read hotel data from Excel file
app.get('/hotels', (req, res) => {
  const workbook = new excel.Workbook();
  workbook.xlsx.readFile('hotel-database.xlsx')
    .then((workbook) => {
      const worksheet = workbook.getWorksheet(1);
      const hotels = [];

      worksheet.eachRow(async (row, rowNumber) => {
        if (rowNumber !== 1) { // Skip the header row
          const hotel = {
            id: row.getCell(1).value,
            name: row.getCell(2).value,
            price: row.getCell(3).value,
            availability: row.getCell(5).value,
            rating: row.getCell(6).value,
            image: row.getCell(7).value,
          };

          hotels.push(hotel);
        }
      });

      res.json(hotels);
    })
    .catch((error) => {
      console.error('Error reading Excel file:', error);
      res.status(500).send('Internal Server Error');
    });
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



mongoose.connect('mongodb+srv://Aniket:Aryan7738@cluster0.w8e5wlw.mongodb.net/your_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
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







// Implement other routes as needed (e.g., for room data)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});