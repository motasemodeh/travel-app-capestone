//setting up an instance of .env
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('isomorphic-fetch');

const app = express();
const port = 9030;




app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});

// API endpoints here
// Geonames API endpoint
app.get('/geonames', async (req, res) => {
    const destination = req.query.destination;
    // API variables
    const geoBaseURL = 'http://api.geonames.org/searchJSON?q=';
    const geonamesApiKey = process.env.GEO_USERNAME;
    const url = `${geoBaseURL}${destination}&maxRows=1&username=${geonamesApiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Weatherbit API endpoint
  app.get('/weatherbit', async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const departureDate = req.query.departureDate;
    const weatherbitApiKey = process.env.WEATHERBIT_KEY;
    const url = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&days=7&key=${weatherbitApiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Pixabay API endpoint
  app.get('/pixabay', async (req, res) => {
    const destination = req.query.destination;
    const pixabayApiKey = process.env.PIXABAY_API_KEY;
    const url = `https://pixabay.com/api/?q=${destination}&key=${pixabayApiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});