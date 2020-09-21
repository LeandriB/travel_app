import { response } from "express";
import swal from "sweetalert";
import { validating } from "./validateInput";

/* GLOBAL VARIABLES */ 

// Setup empty JS object to act as endpoint for all routes
let tripData = {};

// Declare API credentials for Geonames below
const geoNamesUrl = 'https://api.geonames.org/searchJSON?q=';
const geoNamesParams = '&maxRows=1&username=';
const geoNamesKey = process.env.API_KEY1;

// Declare API credentials for Weatherbit below
const weatherbitUrl = 'https://api.weatherbit.io/v2.0/history/daily?';
const weatherbitParams = `city=${destination}&key=`;
//const weatherbitParams = 'lat=${latitude}&lon=${longitude}&key='; // Change params
const weatherbitKey = process.env.API_KEY2;

// Declare API credentials for Pixabay below
const pixabayUrl = 'https://pixabay.com/api/?key=';
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

    if(Client.validating(formValues)) {
        const response = await fetch("http://localhost:8081/post", {
            method: "POST",
            credentials: "same-origin",
            mode: "cors",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(formValues)
        }).then(data => data.json())
        .then(function(data) {
            console.log(data);
            // ADD modal querySelectors
        }).catch((error) => {
            console.log('Error: ', error);
        });
    } else {
        // Sweetalert for error message
        swal("Error", "Invalid URL");
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
        console.log("Error: ", error);
    }
};

// Function to get Weatherbit data
const getWeather = async(weatherbitUrl, weatherbitParams, weatherbitKey) => {
    const response = await fetch(weatherbitUrl + weatherbitParams + weatherbitKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error: ", error);
    }
};

// Function to get Pixabay data
const getPicture = async(pixabayUrl, pixabayKey, pixabayParams) => {
    const response = await fetch(pixabayUrl + pixabayKey + pixabayParams);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
        console.log("Error: ", error)
    }
};

// Function for POST data

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




export { performAction }