// DOM variables
var searchBtn = $('#search-button');
var searchInput = $('#search-input');
var searchHistory = $('#history');

// API variables
var API_KEY = '64b3c6a31b964dd3885bceb16d79051e';
var API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}`;

// API call
// $.ajax({
//   url: API_URL,
//   method: "GET"
// }).then(function(response) {
// console.log(response);
// });

var historicChoice = searchInput.val();

// EventListener on Search Button function
searchBtn.on("click", function(event) {
  event.preventDefault();
  searchHistory.append(`<p class="btn btn-secondary">${historicChoice}</p>`); // CHANGE THIS
});
