// Global DOM variables
var searchBtn = $('#search-button');
var searchHistory = $('#history');
var weatherBox = $('#weather-box');
var fiveDayForecast = $('#five-day-box');
var cityName = "";

// API variables
var API_KEY = '64b3c6a31b964dd3885bceb16d79051e';

// EventListener on Search Button function
searchBtn.on("click", function(event) {
  // Prevent reload of page
  event.preventDefault();
  // Clearing divs for new weather information
  clearDisplays();
  // Grabbing cityName from input field
  cityName = $('#search-input').val()
  // Adding userSearch to their history in a form of buttons
  searchHistory.append(`<p class="btn btn-secondary">${cityName}</p>`);
  // API call and displaying of weather
  getCurrentWeather();
  getFiveForecast();
});

function getCurrentWeather() {
  // Current Weather API request
  var CURRENT_WEATHER = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
  // Running AJAX Fetch
  $.ajax({
    url: CURRENT_WEATHER,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // Creating variables for the weatherBox
    var todayDate = moment().format("DD/MM/YY");
    var cityHeader = $(`<h2>${response.city.name + ' ' + todayDate}</h2>`); // <-- ADD ICON TO THIS
    var temp = $(`<p>Temp: ${Math.round((response.list[0].main.temp) - 273.15)}°C</p>`);
    var wind = $(`<p>Wind: ${response.list[0].wind.speed}MPH</p>`);
    var humidity = $(`<p>Humidity: ${response.list[0].main.humidity}%</p>`);
    // Appending variables to the weatherBox
    weatherBox.append(cityHeader, temp, wind, humidity);
  });
};

function getFiveForecast() {
  // Current Weather API request
  var FIVE_DAY = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
  // Running AJAX Fetch
  $.ajax({
    url: FIVE_DAY,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    // Creating variables for the weatherBox
    var todayDate = moment().format("DD/MM/YY");
    var cityHeader = $(`<h2>${response.city.name + ' ' + todayDate}</h2>`); // <-- ADD ICON TO THIS
    var temp = $(`<p>Temp: ${Math.round((response.list[0].main.temp) - 273.15)}°C</p>`);
    var wind = $(`<p>Wind: ${response.list[0].wind.speed}MPH</p>`);
    var humidity = $(`<p>Humidity: ${response.list[0].main.humidity}%</p>`);
    // Appending variables to the weatherBox
    fiveDayForecast.append(cityHeader, temp, wind, humidity);
  });
};

function clearDisplays() {
  weatherBox.empty();
  fiveDayForecast.empty();
};
