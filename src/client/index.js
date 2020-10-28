import { addTrip } from "./js/app.js"
import { checkInput } from "./js/inputCheck.js"
//import { addToTripList } from "./js/localStorage.js"
import './styles/main.scss'

/**** Event Listeners ****/

document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();

    const print = document.querySelector("#print");
    const cancel = document.querySelector("#delete");

    // Print button
    print.addEventListener('click', function () {
        window.print();
        location.reload();
    });

    // Delete button
    cancel.addEventListener('click', function () {
        form.reset();
        result.classList.add("hidden");
        location.reload();
    });
});

export { addTrip }
export { checkInput }
//export { addToTripList }