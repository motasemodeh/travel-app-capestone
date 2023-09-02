const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('isomorphic-fetch');

const app = express();

// API variables
const baseURL = 'http://api.geonames.org/searchJSON?q=';
const geonamesParameters = '&maxRows=10&fuzzy=0.8&';
const apiKey = process.env.GEO_USERNAME;


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

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});



// designates what port the app will listen to for incoming requests
const port = 9020;
app.listen(port, function () {
    console.log(`app listening on port ${port}`);
});