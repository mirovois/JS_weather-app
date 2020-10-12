"use strict";
searchButton.addEventListener("click", searchWeather);
var myData = {
  temperatureFarenheit: 0,
  temperatureCelcius: 0,
};

switchTemperature.addEventListener('click', switchTemp)
loadingText.style.display = "none";
weatherInfo.style.display = "none";

function searchWeather() {
  // console.log(searchCity.value);
  loadingText.style.display = "block";
  // weatherInfo.style.display = "none";

  var cityName = searchCity.value;
  if (cityName.length == 0) {
    alert("Please enter a city");
    loadingText.style.display = "none";
  }
  var apiKey = "key";
  var url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;

  // Call to API using XMLHttpRequest object  
  
  // var http = new XMLHttpRequest();
  // var method = "GET";
  // http.open(method, url);
  // http.onreadystatechange = function () {
  //   if (http.readyState === XMLHttpRequest.DONE && http.status === 200) {
  //     var data = JSON.parse(http.responseText);
  //     var weatherData = new Weather(
  //       cityName,
  //       data.weather[0].description.toUpperCase()
  //     );
  //     weatherData._temperature = data.main.temp;
  //     updateWeather(weatherData);
  //     console.log(data);
  //   } else if (http.readyState === XMLHttpRequest.DONE) {
  //     alert("Something went wrong");
  //   }
  // };
  // http.send();


  // Call to API using fetch() method 

  fetch(url)
  .then(response => response.json())
  .then(data => {
    var weatherData = new Weather(
      cityName,
      data.weather[0].description.toUpperCase(),
      );
      
      weatherData.temperatureFarenheit = data.main.temp;
      weatherData.temperatureCelcius = data.main.temp;
      
      updateWeather(weatherData);
      myData = {
        temperatureFarenheit: weatherData.temperatureFarenheit,
        temperatureCelcius: weatherData.temperatureCelcius
      }; 
    // console.log(weatherData);  
    // console.log(myData);  
   } )
  .catch(function(error) {
    console.log("error: " + error);
   });  
}

function updateWeather(weatherData) {
  city.textContent = weatherData.cityName;
  description.textContent = weatherData.description;
  temperatureActual.textContent = weatherData.temperatureCelcius;
  celciusButton.classList.add('active');
  loadingText.style.display = "none";
  weatherInfo.style.display = "block";
  searchCity.value = "";
}

function switchTemp(e) {
    
    var t = e.target.getAttribute('data-temp');
    console.log(t);
    if (t === 'farenheit') {
      temperatureActual.innerHTML = myData.temperatureFarenheit;
      celciusButton.classList.remove('active');
      farenheitButton.classList.add('active');
      console.log(temperatureActual)
    } else {
      temperatureActual.textContent = myData.temperatureCelcius;
      celciusButton.classList.add('active');
      farenheitButton.classList.remove('active');
      console.log(temperatureActual)
    }
}
