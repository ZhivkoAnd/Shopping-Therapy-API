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

// Export the Express API
module.exports = app;