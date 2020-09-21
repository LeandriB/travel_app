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
const port = 8080;
// call to debug
app.listen(port, function() {
    console.log(`Travel app is listening on  ${port}!`)
});

// GET Route
app.get('/', function(request, response) {
    response.sendFile('dist/index.html')
});

// Add POST routes
