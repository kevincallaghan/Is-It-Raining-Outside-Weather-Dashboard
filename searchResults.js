// Weather API Key
const apiKey = '221ea02e6362d0fd01a86b68534e79a4';

// Get the city from local storage that was saved in the form submit on index.html
const city = localStorage.getItem("searchInputVal");

// Build the fetch URL using the API key and city
const queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&contentType=json`;

// HTML elements for displaying my weather data on the searchResults page
const cityNameEl = document.getElementById('city-name');
const dateEls = document.querySelectorAll('.date');
const iconEls = document.querySelectorAll('.icon');
const tempEls = document.querySelectorAll('.temp');
const humidityEls = document.querySelectorAll('.humidity');
const windEls = document.querySelectorAll('.wind');

//Using fetch method from class assignment 06-14
function getApi(queryUrl) {
  fetch(queryUrl)
    .then(function (response) {
      if (response.status !== 200) {
        responseText.textContent = response.status;
      }
      return response.json();
    })
    .then(function (data) {
      console.log('------ Data for City API ------');
      console.log(data);
      processWeatherData(data);
    });
}

getApi(queryUrl);

function processWeatherData(response) {

  var location = response.resolvedAddress;
  var latitude = response.coord.lat;
  var longitude = response.coord.lon;
  //save lat and lon to local storage
  localStorage.setItem("latitude", latitude);
  localStorage.setItem("longitude", longitude);

  //API to get 5 day weather using lat and lon
  // Get the lat and long from local storage
  console.log('------ Lat Lon for Query ------')
  const queryLat = localStorage.getItem("latitude");
  console.log("Latitude for Query: " + queryLat);
  const queryLon = localStorage.getItem("longitude");
  console.log("Longitude for Query: " + queryLon);

  const secondQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${queryLat}&lon=${queryLon}&units=imperial&appid=${apiKey}&contentType=json`

  function getSecondApi(secondQueryUrl) {
    fetch(secondQueryUrl)
      .then(function (response) {
        if (response.status !== 200) {
          responseText.textContent = response.status;
        }
        return response.json();
      })
      .then(function (latLonData) {
        console.log('------ Data for Lat Lon API ------');
        console.log(latLonData);
        displayWeatherData(latLonData);
      });

      //! DISPLAY THE WEATHER

    function displayWeatherData(latLonData) {
      console.log('------ test accessing latLonData.city.name inside displayWeatherData ------');
      console.log(latLonData.city.name);
      const cityName = latLonData.city.name;
      const weatherList = latLonData.list;

      const weatherContainer = document.getElementById("weatherContainer");
      // clear the container before appending new data
      weatherContainer.innerHTML = "";
      //Add city name to the "Title" on html
      document.getElementById("resultCityTitle").textContent = cityName;

      // Display weather data for the next 5 days
      for (let i = 0; i < 5; i++) {
        const weather = weatherList[i];
        const weatherDiv = document.createElement("div");
        weatherDiv.classList.add("weather-container", "mx-auto", "p-3", "m-3", "text-center", "border", "border-dark", "rounded");

        // Display date
        // get the current date using dayJS
        const currentDate = dayjs().startOf('day');
        const dateHeader = document.createElement("h3");
        dateHeader.textContent = currentDate.add(i, 'day').format('dddd MMM D');
        dateHeader.style.display = "inline-block";
        dateHeader.style.marginRight = "20px";
        weatherDiv.appendChild(dateHeader);

        // Display icon
        const iconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
        const iconImg = document.createElement("img");
        iconImg.setAttribute("src", iconUrl);
        iconImg.style.width = "50px";
        iconImg.style.display = "inline-block";
        iconImg.style.marginRight = "20px";
        weatherDiv.appendChild(iconImg);

        // Display temperature
        const temperature = weather.main.temp;
        const temperatureP = document.createElement("p");
        temperatureP.textContent = `Temperature: ${temperature} °F`;
        temperatureP.style.display = "inline-block";
        temperatureP.style.marginRight = "20px";
        weatherDiv.appendChild(temperatureP);

        // Display humidity
        const humidity = weather.main.humidity;
        const humidityP = document.createElement("p");
        humidityP.textContent = `Humidity: ${humidity}%`;
        humidityP.style.display = "inline-block";
        humidityP.style.marginRight = "20px";
        weatherDiv.appendChild(humidityP);

        // Display wind speed
        const windSpeed = weather.wind.speed;
        const windSpeedP = document.createElement("p");
        windSpeedP.textContent = `Wind Speed: ${windSpeed} mph`;
        windSpeedP.style.display = "inline-block";
        windSpeedP.style.marginRight = "20px";
        weatherDiv.appendChild(windSpeedP);

        weatherContainer.appendChild(weatherDiv);
      }
    }
      //! DISPLAY THE WEATHER END

  }
  getSecondApi(secondQueryUrl);
};

// Search form on results page

var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector('#search-input').value;


  if (!searchInputVal) {
    console.error('You need a search input value!');
    return;
  }

  localStorage.setItem("searchInputVal", searchInputVal);
  var searchResults = './searchResults.html';

  location.assign(searchResults);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

//TODO FIGURE OUT HOW TO SAVE PREVIOUS SEARCHES
