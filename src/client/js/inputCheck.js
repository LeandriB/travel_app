import swal from "sweetalert";

function checkInput(departing, destination) {
    let urlRGEX = /^[a-zA-Z\s]{0,255}$/;
    if (urlRGEX.test(departing) && urlRGEX.test(destination)) {
      return
    } else {
      swal("Invalid input");
    }
  }

export { checkInput }
