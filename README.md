# Travel App

## About

The goal for this project is to create and build out a travel app that allows the user to enter a location & trip date, and in return displays weather as well as an image of the location using information from 3 external API's.

> The world is a book and those who do not travel read only one page - Saint Augustine

## Installation

1. Clone the directory
2. In the terminal, navigate to the root directory for this project
3. Run ```npm install``` to install all dependencies
4. Make sure that there is no **dist folder** and if there is run ```rm -rf dist``` in order to remove the folder
5. Now that everything is set up, continue onto the section *How to run this program*

## How to run this program

Make sure all your dependencies are installed in your terminal or updated to the lasest version and  ```cd``` into the project folder.

###### Run in Development

```npm run build-dev```

###### Run in Production

```npm run build-prod```

Start up the server in the terminal using ```npm run start``` and open the web page through a localhost in your browser.

## Dependencies

* HTML
* CSS
* Javascript
* [NodeJS](https://nodejs.org/en/download/)
* [ExpressJS](https://www.npmjs.com/package/express)
* [BodyParser](https://www.npmjs.com/package/body-parser)
* [Cors](https://www.npmjs.com/package/cors)
* [Webpack](https://webpack.js.org/concepts/)
* [Node-Fetch](https://www.npmjs.com/package/node-fetch)
* [Jest](https://jestjs.io/en/)
* [Service Workers](https://developers.google.com/web/tools/workbox/guides/generate-service-worker/webpack)

## API's

* [GeoNames](https://www.geonames.org/) API in order to retrieve the destinations latitude and longitude. 
* [Weatherbit](https://www.weatherbit.io/) API in order to retrieve the weather.
* [Pixabay](https://pixabay.com/) API in order to retrieve a picture of destination city.

## Project Screenshots

![Project Preview](/img/news1.png)
![Output Preview](/img/output.png)

## Attributions

* How to incorporate a [countdown timer](https://codepen.io/SitePoint/pen/NWxKgxN) for days left before trip
* Understanding [Node-fetch](https://hackersandslackers.com/making-api-requests-with-nodejs/)
* How to validate user input with Javascript via [TutorialsPoint](https://www.tutorialspoint.com/javascript/javascript_form_validations.htm
* Understanding [regex](https://www.youtube.com/watch?v=6-5Se9Ym1E4)
* Hide Results until button click via [Stackoverflow](https://stackoverflow.com/questions/56111480/how-can-i-hide-a-div-until-a-button-is-clicked) 
* [Jest](https://www.valentinog.com/blog/jest/) for beginners
* Getting started with [Jest](https://jestjs.io/docs/en/getting-started)
* How to convert Celcius to Farenheit via [Stackoverflow](https://stackoverflow.com/questions/26046474/celsius-and-fahrenheit-converter-javascript)
* How to create an [inline form](https://www.w3schools.com/howto/howto_css_inline_form.asp) that is responsive.
* Home-Image from [Annie Spratt](https://unsplash.com/photos/qyAka7W5uMY) via Unsplash.
* How to flip a date around to show day before year via [Stackoverflow](https://stackoverflow.com/questions/40232218/how-to-reverse-date-format-yyyy-mm-dd-using-javascript-jquery)
* How to open in new window via [w3schools.com](https://www.w3schools.com/jsref/met_win_open.asp)
* Icons made by <a href="http://www.freepik.com/" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> - weather
* Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> - destination
* Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> - calender
* Icons made by <a href="https://www.flaticon.com/free-icon/travel-luggage_2721425" title="Linector">Linector</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a> - suitcase