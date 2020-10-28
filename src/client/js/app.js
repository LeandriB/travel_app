import swal from "sweetalert";

// Global Variables
const form = document.querySelector("#form");
const result = document.querySelector("#result"); // Change to MODAL
const header = document.querySelector("#header");

const print = document.querySelector("#print");
//const book = document.querySelector("#book");

const dateNow = (Date.now()) / 1000;

// Declare API credentials for Geonames below
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const geoNamesKey = process.env.API_KEY1;

// Declare API credentials for Weatherbit below
const weatherbitURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherbitKey = process.env.API_KEY2;

// Declare API credentials for Pixabay below
const pixabayURL = "https://pixabay.com/api/?key=";
const pixabayKey = process.env.API_KEY3;

// EVENT LISTENERS

// Submit form button
form.addEventListener('submit', addTrip);
// Print button
print.addEventListener('click', function (event) {
  event.preventDefault(event);
  window.print();
  location.reload();
});

// FUNCTIONS 

// Function callback for event listener
function addTrip(event) {
  event.preventDefault();
  //  User input
  const departing = document.getElementById('input-from').value;
  const destination = document.getElementById('input-to').value;
  const tripDate = document.getElementById('input-date').value;


  const newDate = (new Date(tripDate).getTime()) / 1000;

  // Function to validate user input 
  Client.checkInput(departing, destination);

  getCity(geoNamesURL, destination, geoNamesKey)
    .then((cityData) => {
      const latitude = cityData.geonames[0].lat;
      const longitude = cityData.geonames[0].lng;
      const country = cityData.geonames[0].countryName;
      const weatherData = getWeather(latitude, longitude, country, newDate)
      return weatherData;
    })
    .then((weatherData) => {
      const daysToTrip = Math.round((newDate - dateNow) / 86400);
      const allData = postTripData('http://localhost:5500/add', { departing, destination, tripDate, weather: weatherData.data[0].high_temp, description: weatherData.data[0].weather.description, daysToTrip });
      return allData;
    }).then((allData) => {
      showModal(allData);
    })
}

// Function to get city data from Geonames API
const getCity = async (geoNamesURL, destination, geoNamesKey) => {
  const response = await fetch(geoNamesURL + destination + "&maxRows=10&" + "username=" + geoNamesKey);
  try {
    const cityData = await response.json();
    return cityData;
  } catch (error) {
    console.log("error", error);
    swal("ERROR", error);
  }
};

// Functiont to get weather data from Weatherbit API
const getWeather = async (latitude, longitude) => {
  const response = await fetch(weatherbitURL + "lat=" + latitude + "&lon=" + longitude + "&key=" + weatherbitKey);
  try {
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log("error", error);
    swal("ERROR", error);
  }
}

// Function to POST data
const postTripData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      departing: data.departing,
      destination: data.destination,
      tripDate: data.tripDate,
      weather: data.weather,
      description: data.description,
      daysToTrip: data.daysToTrip
    })
  })
  try {
    const allData = await response.json();
    return allData;
  } catch (error) {
    console.log("error", error);
    swal("ERROR", error);
  }
}

// Function to show the results from user input
const showModal = async (allData) => {
  result.classList.remove("hidden");
  header.classList.add("hidden");
  // Fetch city image from Pixabay API
  const response = await fetch(pixabayURL + pixabayKey + "&q=" + allData.destination + "+city&image_type=photo");

  try {
    const getImage = await response.json();
    document.querySelector(".city").innerHTML = allData.destination;
    document.querySelector(".date").innerHTML = allData.tripDate.split("-").reverse().join("-");
    document.querySelector(".days").innerHTML = allData.daysToTrip;
    document.querySelector(".summary").innerHTML = allData.description.toLowerCase();
    document.querySelector(".weather").innerHTML = Math.round(allData.weather * 9 / 5 + 32)+ "&deg;F";
    document.querySelector(".pixabay").setAttribute('src', getImage.hits[0].webformatURL);
  }
  catch (error) {
    console.log("error", error);
    swal("ERROR", error);
  }
}

export { showModal,
         postTripData,
         getWeather,
         getCity,
         addTrip }