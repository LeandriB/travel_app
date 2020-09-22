// Setup empty JS object to act as endpoint for all routes
let tripData = {};

// Dependencies
var path = require('path');

// Used to keep API key private
const dotenv = require('dotenv');
dotenv.config();

// Require Express to run server and routes
const express = require('express');
// Start up an instance of an app
const app = express();
// Initialize the main project folder
app.use(express.static('dist'));

// Body Parser as middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Require node-fetch
const fetch = require('node-fetch');

// Designates what port the app will listen to for incoming requests
const port = 8080; // Change PORT?
// call to debug
app.listen(port, function() {
    console.log(`Travel app is listening on  ${port}!`)
});

// GET Route
app.get('/', function(request, response) {
    response.sendFile('dist/index.html')
});

// Add POST routes

// POST route for geonames
app.post('/geonames', geonames);

async function geonames(request, response) {
    geonamesData = {
        latitude: request.body.lat,
        longitude: request.body.lon,
    };
    tripData.push(geonamesData);
    console.log("User input: ", tripData);
    response.send(tripData);
};

// POST route for wethaerbit

app.post('/weather', weatherbit);

async function weatherbit(request, response) {
    weatherbitData = {
        high: request.body.high,
        low: request.body.low,
        description: request.body.description,
    };
    tripData.push(weatherbitData);
    console.log("User input: ", tripData);
    response.send(tripData);
};

// POST route for pixabay

app.post('/image', pixabay);

async function pixabay(request, response) {
    pixabayData = {
        image: request.body.image,
    };
    tripData.push(pixabayData);
    console.log("User input: ", tripData);
    response.send(tripData);
};

module.exports = server;