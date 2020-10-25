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

// Submit form button
form.addEventListener('submit', addTrip);
// Print button
print.addEventListener('click', function (event) {
  event.preventDefault(event);
  window.print();
  location.reload();
});
// Delete button
/*cancel.addEventListener('click', function (event) {
  event.preventDefault(event);
  form.reset();
  result.classList.add("hidden");
  location.reload();
})
// Book trip button
book.addEventListener('click', function (event) {
  event.preventDefault(event);
  window.open("https://www.delta.com/");
});*/

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

// Local Storage
// Variables for Local Storage 
const save = document.querySelector("#save");
const tripList = document.querySelector(".trip-container");
const userInput = document.querySelector(".result-container"); // Remove?

function template(data) {

  tripList.insertAdjacentHTML("beforeend", 
  `<div class="container results">
        <div class="result-image">
            <img class="image" alt="destination image" src="${data.pixabay}">
        </div>
        <div class="result-content">

          <h2 class="city text-result">Destination: <span>${data.destination}</span></h2>

          <h2 class="date text-result">Departing: <span>${data.date}</span></h2>

          <h2 class="days text-result">Trip starts in <span> ${data.daysToTrip} </span> days</h2>
        
          <h2 class="weather text-result">Weather will be <span>${data.weather}</span> for a high with 
          <span>${data.description}</span>.</h2>

          <button class="button button-book" id="book" href="#">Book</button>

          <button class="button button-delete" id="delete" href="#">Delete</button>
        </div>
    </div>`);

    const cancel = document.querySelector("#delete");
// Delete button
cancel.addEventListener('click', function (event) {
  event.preventDefault();
  form.reset();
  result.classList.add("hidden");
  location.reload();
})

const book = document.querySelector("#book");
// Book
book.addEventListener('click', function (event) {
  event.preventDefault();
  window.open("https://www.delta.com/");
});
}

function addToTripList(event) {

  const data = {
      destination: document.querySelector(".city").innerHTML.value,
      date: document.querySelector(".date").innerHTML.value,
      weather: document.querySelector(".weather").innerHTML.value,
      description: document.querySelector(".summary").innerHTML.value,
      daysToTrip: document.querySelector(".date").innerHTML.value,
      //pixabay: pixabay.value
  };

  event.preventDefault();

  template(data);

  localStorage.setItem("savedTrips", userInput.innerHTML);
}
// Works to above code
save.addEventListener('click', addToTripList, function(event) {
  event.preventDefault();
  tripList.scrollIntoView({ behavior: 'smooth' });
  form.reset();
  result.classList.add("hidden");
})

const saved = localStorage.getItem("savedTrips");

if (saved) {
  tripList.innerHTML = saved;
}

export { showModal,
         postTripData,
         getWeather,
         getCity,
         addTrip }