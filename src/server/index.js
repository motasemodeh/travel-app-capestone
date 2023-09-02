const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('isomorphic-fetch');

const app = express();

// API Geonames variables
const baseURL = 'http://api.geonames.org/searchJSON?q=';
const geonamesParameters = '&maxRows=10&fuzzy=0.8&';
const apiKey = process.env.GEO_USERNAME;

//Weatherbit Api Variables

const weatherbitApiKey = process.env.WEATHERBIT_KEY;

const API_KEY = process.env.PIXABAY_API_KEY;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile('dist/index.html');
});


app.post('/api', async function (req, res, next) {
    try {
        const userInput = req.body.url;
        console.log(`You entered: ${userInput}`);
        const apiURL = `${baseURL}${userInput}${geonamesParameters}username=${apiKey}`;
        

        const response = await fetch(apiURL);
        const mcData = await response.json();
        console.log(mcData);
        res.send(mcData);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
});


app.post('/weatherbit', async function handleWeatherForecastRequest(req, res) {
    const lat = req.body.lat;
    const lng = req.body.lng;

    if (lat && lng) {
        const WeatherURL = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${weatherbitApiKey}`;
        
        try {
            const response = await fetch(WeatherURL);
            if (response.ok) {
                const jsonRes = await response.json();
                res.status(200).json(jsonRes);
            } else {
                res.status(response.status).json({ error: 'Weatherbit request failed' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        res.status(400).json({ error: 'Bad Request. Missing latitude (lat) and/or longitude (lng).' });
    }
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



// designates what port the app will listen to for incoming requests
const port = 9020;
app.listen(port, function () {
    console.log(`app listening on port ${port}`);
});

