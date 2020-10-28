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
  

export {
    addToTripList,
    template
}