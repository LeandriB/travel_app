// Setup empty JS object to act as endpoint for all routes
let tripData = {};

// Dependencies
var path = require('path');

// Require Express to run server and routes
const express = require('express');
// Start up an instance of an app
const app = express();
// Initialize the main project folder
app.use(express.static('dist'));

// Body Parser as middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Require node-fetch
const fetch = require('node-fetch');
const { response } = require('express');

// Designates what port the app will listen to for incoming requests
const port = 5500;
app.listen(port, listening);
// Callback to debug
function listening() {
  console.log(`Travel app listening on port ${port}!`);
};

// GET Route
app.get('/', function (request, response) {
  response.sendFile('dist/index.html')
})

// POST Route
app.post('/add', tripInfo);

function tripInfo(request, response) {
  tripData['city'] = request.body.depCity;
  tripData['arrCity'] = request.body.arrCity;
  tripData['depDate'] = request.body.depDate;
  tripData['weather'] = request.body.weather;
  tripData['summary'] = request.body.weather.description;
  tripData['daysLeft'] = request.body.daysLeft;
  console.log("User Input: ", tripData)
  response.send(tripData);
}
