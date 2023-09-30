import cors from "cors";

const express = require('express');
const app = express();
const port = 3000;
app.use(cors());


// Endpoint to get the array of cities
app.get('/cities', (req, res) => {
  // Read the JSON file and send it as a response
  const cities = require('./cities.json');
  res.json(cities);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


// Endpoint for specific city
app.get('/cities/:id', (req, res) => {
  // Read the JSON file and find the city by ID
  const cities = require('./cities.json');
  const cityId = parseInt(req.params.id);

  const city = cities.find(city => city.id === cityId);

  if (!city) {
    return res.status(404).json({ message: 'City not found' });
  }

  res.json(city);
});

// Export the Express API
module.exports = app;