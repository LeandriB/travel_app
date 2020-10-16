// Global Variables

const form = document.querySelector("#form");
const result = document.querySelector("#result"); // Change to MODAL

const save = document.querySelector("#save");
const cancel = document.querySelector("#delete");

const dateNow = (Date.now()) / 1000;

// Declare API credentials for Geonames below
const geoNamesURL = 'http://api.geonames.org/searchJSON?q=';
const geoNamesKey = "leandrib";

// Declare API credentials for Weatherbit below
const weatherbitURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherbitKey = "ac2c8a9006ad4596839cd8e73f27220f";

// Declare API credentials for Pixabay below
const pixabayURL = "https://pixabay.com/api/?key=";
const pixabayKey = "18210327-5150d9b47ecfb966ec7bb906c";

// EVENT LISTENERS

// add trip button
//const addTripEvList = addTripButton.addEventListener('click', function (e) {
  //e.preventDefault();
 // planner.scrollIntoView({ behavior: 'smooth' });
//})
//ABOVE CODE REMOVES ADD TRIP BUTTON

// Form submit
form.addEventListener('submit', addTrip);
// Print button
save.addEventListener('click', function (e) {
  window.print();
  location.reload();
});
// Delete button
cancel.addEventListener('click', function (e) {
  form.reset();
  result.classList.add("invisible");
  location.reload();
})

// FUNCTIONS 

// Function callback for event listener
function addTrip(event) {
  event.preventDefault();
  //  User input
  const departing = document.getElementById('input-from').value;
  const destination = document.getElementById('input-to').value;
  const tripDate = document.getElementById('input-date').value;


  const newDate = (new Date(tripDate).getTime()) / 1000;

  // function checkInput to validate input 
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
      const daysLeft = Math.round((newDate - dateNow) / 86400);
      const userData = postData('http://localhost:5500/add', { departing, destination, tripDate, weather: weatherData.data[0].high_temp, summary: weatherData.data[0].weather.description, daysLeft });
      return userData;
    }).then((userData) => {
      updateUI(userData);
    })
}

//function getCity to get city information from Geonames (latitude, longitude, country)

const getCity = async (geoNamesURL, destination, geoNamesKey) => {
  // res equals to the result of fetch function
  const response = await fetch(geoNamesURL + destination + "&maxRows=10&" + "username=" + geoNamesKey);
  try {
    const cityData = await response.json();
    // Possibly declare value here??
    return cityData;
  } catch (error) {
    console.log("error", error);
  }
};

// function getWeather to get weather information from Dark Sky API 

const getWeather = async (latitude, longitude) => {
  const response = await fetch(weatherbitURL + "lat=" + latitude + "&lon=" + longitude + "&key=" + weatherbitKey);
  try {
    const weatherData = await response.json();
    return weatherData;
  } catch (error) {
    console.log("error", error);
  }
}

// Function postData to POST data to our local server
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8"
    },
    body: JSON.stringify({
      depCity: data.departing,
      arrCity: data.destination,
      depDate: data.tripDate,
      weather: data.weather,
      summary: data.description,
      daysLeft: data.daysLeft
    })
  })
  try {
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.log("error", error);
  }
}

// Function update UI that reveals the results page with updated trip information including fetched image of the destination

const updateUI = async (userData) => {
  result.classList.remove("invisible");
  result.scrollIntoView({ behavior: "smooth" });

  const response = await fetch(pixabayURL + pixabayKey + "&q=" + userData.arrCity + "+city&image_type=photo");

  try {
    const getImage = await response.json();
    document.querySelector("#city").innerHTML = userData.arrCity;
    document.querySelector("#date").innerHTML = userData.depDate;
    document.querySelector("#days").innerHTML = userData.daysLeft;
    document.querySelector("#summary").innerHTML = userData.description;
    document.querySelector("#weather").innerHTML = Math.round(userData.weather * 9 / 5 + 32)+ "&deg;F";
    document.querySelector("#pixabay").setAttribute('src', getImage.hits[0].webformatURL);
  }
  catch (error) {
    console.log("error", error);
  }
}

export { updateUI,
         postData,
         getWeather,
         getCity,
         addTrip }