import { response } from "express";
import swal from "sweetalert";
import { validating } from "./validateInput";

/* GLOBAL VARIABLES */ 

// Setup empty JS object to act as endpoint for all routes
let tripData = {};

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Declare API credentials for Geonames below
const geoNamesUrl = `https://api.geonames.org/searchJSON?q=`;
const geoNamesParams = `&maxRows=1&username=`;
const geoNamesKey = process.env.API_KEY1;

// Declare API credentials for Weatherbit below
const weatherbitUrl = `https://api.weatherbit.io/v2.0/history/daily?`;
const weatherbitParams = `lat=${latitude}&lon=${longitude}&key=`;
//const weatherbitParams = 'lat=${latitude}&lon=${longitude}&key='; // Change params
const weatherbitKey = process.env.API_KEY2;

// Declare API credentials for Pixabay below
const pixabayUrl = `https://pixabay.com/api/?key=`;
const pixabayParams = `&q=${destination}&image_type=photo`; // Change params?
const pixabayKey = process.env.API_KEY3;

/* MAIN FUNCTION */

// Function callback for event listener
async function performAction(event) {
    event.preventDefault();

    // User input data - DO I STILL NEED THIS HERE?
    // Can I combine multiple ID's?
    const destination = document.getElementById('destination').value;
    const start = document.getElementById('start-date').value;
    const end = document.getElementById('end-date').value;

    if(Client.validating(destination, start, end)) {
        // Call API's
        getCity(geoNamesUrl, destination, geoNamesParams, geoNamesKey)
        .then((data) => {
            return postTrip('/geonames', {latitude: data.geonames[0].lat, longitude: data.geonames[0].lon});
        }).then((response => {
            const latitude = response[response.length - 1].latitude;
            const longitude = response[response.length - 1].longitude;
            return {latitude, longitude};
        }).then(({latitude, longitude}) => {
            return getWeather(weatherbitUrl, weatherbitParams, weatherbitKey); // take in lat & lon as params?
        }).then((weatherData) => {
            return postTrip('/weather', {high: weatherData.data[0].high_temp, low: weatherData.data[0].low_temp, description: weatherData.data[0].description});
        }).then(() => {
            return getPicture(pixabayUrl, pixabayKey, pixabayParams);
        }).then((data) => {
            return postTrip('/image', {image: data.hits[0].webformatURL});
        }).then(updateUI('/all'))
            
    )} else {
        // Sweetalert for error message
        swal("Error", "Invalid Input");
    }

};

/* Functions to GET web API data */

// Function to get Geonames data
const getCity = async(geoNamesUrl, destination, geoNamesParams, geoNamesKey) => {
    const response = await fetch(geoNamesUrl + destination + geoNamesParams + geoNamesKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error with Geonames: ", error);
    }
};

// Function to get Weatherbit data
const getWeather = async(weatherbitUrl, weatherbitParams, weatherbitKey) => {
    const response = await fetch(weatherbitUrl + weatherbitParams + weatherbitKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error with Weatherbit: ", error);
    }
};

// Function to get Pixabay data
const getPicture = async(pixabayUrl, pixabayKey, pixabayParams) => {
    const response = await fetch(pixabayUrl + pixabayKey + pixabayParams);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error with Pixabay: ", error)
    }
};

// Function to POST data

const postTrip = async(url='', data={}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch(error) {
        console.log("Error: ", error);
    };
};

// Function to update the UI

const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('place').innerHTML = allData.place;
        document.getElementById('high').innerHTML = allData.high + "deg;F";
        document.getElementById('low').innerHTML = allData.low + "deg;F";
        document.getElementById('description').innerHTML = allData.description;
        document.getElementById('image').src = allData.image;

    }catch(error) {
        console.log("Error: ", error);
    }
};




export { performAction,
         getCity,
         getWeather,
         getPicture,
         postTrip,
         updateUI }