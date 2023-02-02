// Global DOM variables
var searchBtn = $('#search-button');
var searchHistory = $('#history');
var savedCity = [];
var weatherBox = $('#weather-box');
var fiveDayForecast = $('#five-day-box');
var cityName = "";
var kelvToCels = 273.15;

// API variables
var API_KEY = '64b3c6a31b964dd3885bceb16d79051e';

// EventListener on Search Button function
searchBtn.on("click", function(event) {
  event.preventDefault();
  // Clearing divs for new weather information
  clearDisplays();
  // Grabbing cityName from input field
  cityName = $('#search-input').val()
  // Adding userSearch to their history in a form of buttons
  searchHistory.append(`<p class="btn btn-secondary">${cityName}</p>`);
  // Adding this search to localStorage for saving
  savedCity.push(cityName);
  localStorage.setItem("savedCity", JSON.stringify(savedCity));
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
    var cityIcon = `https://openweathermap.org/img/w/${response.list[0].weather[0].icon}.png`;
    var cityIconImg = `<img src="${cityIcon}" class="img-fluid icons"/>`;
    // Creating variables for the weatherBox
    var todayDate = moment().format("DD/MM/YY");
    var cityHeader = $(`<h3>${response.city.name + ' ' + todayDate + ' ' + cityIconImg}</h3>`);
    var temp = $(`<p>Temp: ${Math.round((response.list[0].main.temp) - kelvToCels)}°C</p>`);
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
  var forecastHeader = $(`<h3>5 Day Forecast for: ${cityName}</h3>`);
  fiveDayForecast.append(forecastHeader);
  $.ajax({
    url: FIVE_DAY,
    method: "GET"
  }).then(function(response) {
    for (i = 0; i < 5; i++) {
      var forecastDate = moment.unix(response.list[((i + 1) * 8) - 1].dt + response.city.timezone).format("DD-MM-YYYY");
      var card = $(`<div class="card card-body bg-dark mr-5 text-light">`);
      var date = $(`<h5 class="card-title">${forecastDate}</h5>`);
      var icon = $(`<img src="https://openweathermap.org/img/w/${response.list[i].weather[0].icon}.png" class="img-fluid icons"/>`);
      var temp = $(`<p>Temp: ${Math.round((response.list[i].main.temp) - kelvToCels)}°C</p>`);
      var wind = $(`<p>Wind: ${response.list[i].wind.speed}MPH</p>`);
      var humidity = $(`<p>Humidity: ${response.list[i].main.humidity}%</p>`);
      card.append(date, icon, temp, wind, humidity);
      fiveDayForecast.append(card);
    };
  });
};

function clearDisplays() {
  weatherBox.empty();
  fiveDayForecast.empty();
};
