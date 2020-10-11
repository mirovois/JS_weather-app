"use strict";
searchButton.addEventListener("click", searchWeather);
loadingText.style.display = "none";
weatherInfo.style.display = "none";
// function clearSearchField() {
//   let val = 0;
//   searchCity.innerHTML = "";
//   return searchCity;
// }
function searchWeather() {
  console.log(searchCity.value);
  loadingText.style.display = "block";
  weatherInfo.style.display = "none";

  var cityName = searchCity.value;
  if (cityName.length == 0) {
    alert("Please enter a city");
    loadingText.style.display = "none";
  }
  var http = new XMLHttpRequest();
  var apiKey = "3c10e7d60e81e341c569871ce5f4460b";
  var url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;

  var method = "GET";

  http.open(method, url);
  http.onreadystatechange = function () {
    if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
      var data = JSON.parse(http.responseText);
      var weatherData = new Weather(
        cityName,
        data.weather[0].description.toUpperCase()
      );
      weatherData._temperature = data.main.temp;
      updateWeather(weatherData);
      console.log(data);
    } else if (http.readyState === XMLHttpRequest.DONE) {
      alert("Something went wrong");
    }
  };
  http.send();
}

function updateWeather(weatherData) {
  city.textContent = weatherData.cityName;
  description.textContent = weatherData.description;
  temperature.textContent = weatherData.temperature;
  loadingText.style.display = "none";
  weatherInfo.style.display = "block";
  searchCity.value = "";
}
