const express = require('express');
const cors = require('cors');
const excel = require('exceljs');

const app = express();
const port = 5000;

app.use(cors());

// Read hotel data from Excel file
app.get('/hotels', (req, res) => {
  const workbook = new excel.Workbook();
  workbook.xlsx.readFile('hotel-database.xlsx')
    .then((workbook) => {
      const worksheet = workbook.getWorksheet(1);
      const hotels = [];

      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber !== 1) { // Skip the header row
          const hotel = {
            id: row.getCell(1).value,
            name: row.getCell(2).value,
            price: row.getCell(3).value,
            availability: row.getCell(5).value,
            rating: row.getCell(7).value,
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



// Implement other routes as needed (e.g., for room data)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});