// Get the API key from a variable
const apiKey = '221ea02e6362d0fd01a86b68534e79a4';
console.log(apiKey);
// Get the city from local storage that was saved in the form submit on index.html
const city = localStorage.getItem("searchInputVal");
console.log(city);
// Build the fetch URL using the API key and city
const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&contentType=json`;

//Using fetch method from class assignment 06-14
function getApi(queryUrl) {
  fetch(queryUrl)
    .then(function (response) {
      console.log(response.status);
      //  Conditional for the the response.status.
      if (response.status !== 200) {
        // Place the response.status on the page.
        responseText.textContent = response.status;
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      processWeatherData(data);
    });
}

getApi(queryUrl);

function processWeatherData(response) {

  var location = response.resolvedAddress;
  var latitude = response.coord.lat;
  var longitude = response.coord.lon;
  console.log(latitude);
  console.log(longitude);
  //save lat and lon to local storage
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);


  //API to get 5 day weather using lat and lon
  // Get the lat and long from local storage
  const queryLat = localStorage.getItem("latitude");
  console.log("Latitude for Query: " + queryLat);
  const queryLong = localStorage.getItem("longitude");
  console.log("Longitude for Query: " + queryLong);
}



//! SOURCE: I used documentation for a different weather API to get source code and plug in my query and API Key and then return the data I need.  Here is the documentation I used: https://www.visualcrossing.com/resources/documentation/weather-api/how-to-load-weather-data-in-javascript/