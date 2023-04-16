// Get the API key from a variable
const apiKey = '8bfd53837493b8bbb4ace442550cacf8';
console.log(apiKey);
// Get the city from local storage that was saved in the form submit on index.html
const city = localStorage.getItem("searchInputVal");
console.log(city);
// Build the fetch URL using the API key and city
const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&contentType=json`;

// Make the fetch request
fetch(queryUrl, {
  method: 'GET',
  headers: {

  },

}).then(response => {
  if (!response.ok) {
    throw response;
  }

  return response.json();

}).then(response => {
  processWeatherData(response);

}).catch((errorResponse) => {
  if (errorResponse.text) {
    errorResponse.text().then(errorMessage => {
      console.error(errorMessage); // logs the error message
    })
  } else {
    console.error(errorResponse); // logs the error response object
  }
});

function processWeatherData(response) {

  var location = response.resolvedAddress;
  var latitude = response.coord.lat;
  var longitude = response.coord.lon;
  console.log(latitude);
  console.log(longitude);
}

//! SOURCE: I used documentation for a different weather API to get source code and plug in my query and API Key and then return the data I need.  Here is the documentation I used: https://www.visualcrossing.com/resources/documentation/weather-api/how-to-load-weather-data-in-javascript/