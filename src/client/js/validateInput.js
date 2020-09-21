import swal from 'sweetalert';

function validating(inputText) {
    console.log("::: Evaluating :::", inputText);

    const destination = document.getElementById('destination').value;
    const start = document.getElementById('start-date').value;
    const end = document.getElementById('end-date').value;

    if( destination == "" ) {
        swal( "Please enter a destination!" );
        document.myForm.destination.focus() ;
        return false;
     }
     if( start == "" ) {
        swal( "Please provide a start date for trip!" );
        document.myForm.start.focus() ;
        return false;
     }
    
     if( end == "" ) {
        swal( "Please provide an end date for trip!" );
        document.myForm.end.focus() ;
        return false;
     }
     return( true );
}

export { validating }