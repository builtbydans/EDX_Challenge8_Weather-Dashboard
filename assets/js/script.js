// 1. Grab API Query URL with API key
var API_KEY = '64b3c6a31b964dd3885bceb16d79051e';
var API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=London&appid=${API_KEY}`;

$.ajax({
  url: API_URL,
  method: "GET"
}).then(function(response) {
console.log(response);
});
