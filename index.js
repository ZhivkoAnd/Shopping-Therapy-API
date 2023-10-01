import cors from "cors";
const express = require('express');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sample data (in-memory database)
let cities = require('./cities.json');

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Endpoint to get the array of cities
app.get('/cities', (req, res) => {
  res.json(cities);
});

// Endpoint for specific city by ID
app.get('/cities/:id', (req, res) => {
  const cityId = parseInt(req.params.id);
  const city = cities.find(city => city.id === cityId);

  if (!city) {
    return res.status(404).json({ message: 'City not found' });
  }

  res.json(city);
});

// Endpoint to update a city by ID (using PUT)
app.put('/cities/:id', (req, res) => {
  const cityId = parseInt(req.params.id);
  const index = cities.findIndex(city => city.id === cityId);

  if (index !== -1) {
    // Update the city information with the new data from the request body
    cities[index] = { ...cities[index], ...req.body };
    res.json(cities[index]); // Respond with the updated city
  } else {
    res.status(404).json({ message: 'City not found' });
  }
});

// Endpoint to delete a city by ID
app.delete('/cities/:id', (req, res) => {
  const cityId = parseInt(req.params.id);
  const index = cities.findIndex(city => city.id === cityId);

  if (index !== -1) {
    cities.splice(index, 1);
    res.status(204).send(); // 204 No Content indicates successful deletion
  } else {
    res.status(404).json({ message: 'City not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the Express API
module.exports = app;