$(document).ready(function() {
  // Global DOM variables
  var searchBtn = $('#search-button');
  var searchHistory = $('#history');
  var weatherBox = $('#weather-box');

  // EventListener on Search Button function
  searchBtn.on("click", function(event) {
    // Prevent reload of page
    event.preventDefault();
    // Grabbing cityName from input field
    var cityName = $('#search-input').val()
    // API variables
    var API_KEY = '64b3c6a31b964dd3885bceb16d79051e';
    var API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}`;
    // Adding userSearch to their history
    searchHistory.append(`<p class="btn btn-secondary">${cityName}</p>`);

    // API call and displaying of weather
    $.ajax({
      url: API_URL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      // Creating variables for the weatherBox
      var todayDate = moment().format("DD/MM/YY");
      var cityHeader = $(`<h2>${response.city.name + ' ' + todayDate}</h2>`);
      var temp = $(`<p>Temp: ${Math.round((response.list[0].main.temp) - 273.15)}°C</p>`);
      var wind = $(`<p>Wind: ${response.list[0].wind.speed}MPH</p>`);
      var humidity = $(`<p>Humidity: ${response.list[0].main.humidity}%</p>`);
      // Appending variables to the weatherBox
      weatherBox.append(cityHeader, temp, wind, humidity);
    });
  });
});
