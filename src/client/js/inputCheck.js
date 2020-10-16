function checkInput(departing, destination) {
   let urlRGEX = /^[a-zA-Z\s]{0,255}$/;
   if (urlRGEX.test(departing) && urlRGEX.test(destination)) {
     return
   } else {
     alert("Please enter a valid name");
   }
 }
 
 export { checkInput }
 