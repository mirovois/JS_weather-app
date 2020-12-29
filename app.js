"use strict";
searchButton.addEventListener("click", searchWeather);
var myData = {
  temperatureFarenheit: 0,
  temperatureCelcius: 0,
};
// var apiKey = "3c10e7d60e81e341c569871ce5f4460b";

var apiKey = key;

switchTemperature.addEventListener('click', switchTemp)
loadingText.style.display = "none";
weatherInfo.style.display = "none";

function searchWeather() {
  // console.log(searchCity.value);
  loadingText.style.display = "block";
  // weatherInfo.style.display = "none";
  currentLocation.style.display = "none";
  var cityName = searchCity.value;
  if (cityName.length == 0) {
    alert("Please enter a city");
    loadingText.style.display = "none";
    prevent.default();
  }
  var url =
    "http://api.openweathermap.org/data/2.5/weather?q=" +
    cityName +
    "&appid=" +
    apiKey;

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
   } )
  .catch(function(error) {
    console.log("error: " + error);
    loadingText.style.display = "none";
    alert("Enter a valid city name");
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

function showTime(){
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth();
  let date = d.getDate();
  let day =d.getDay();
  let hour = d.getHours();
  let min = d.getMinutes();
  let sec = d.getSeconds();
    
  // Converting month to a string value
    switch(month) {
      case 0:
        month="January";
        break;
      case 1:
        month="February";
        break;
      case 2:
        month="March";
        break;
      case 3:
        month="April";
        break;
      case 4:
        month="May"
        break;  
      case 5:
        month="June"
        break;  
      case 6:
        month="July"
        break;
      case 7:
        month="August"
        break;
      case 8:
        month="September"
        break;
      case 9:
        month="October"
        break;
      case 10:
        month="November"
        break;
      case 11:
        month="December"
        break;
      
      default:
    }
    
    // Converting day to a string value
    switch(day){ 
      case 1:
      day="Monday";
      break;case 2:
      day="Tuesday";
      break;case 3:
      day="Wednesday";
      break;case 4:
      day="Thursday";
      break;case 5:
      day="Friday";
      break;case 6:
      day="Saturday";
      break;case 7:
      day="Sunday";
      break;
      default:
      }
      let MV = "AM";
        
      if(hour <= 12){
        MV = "PM";
        } if(hour > 12){
        hour = hour % 12;
        MV = "PM";
        }
      
      //Adds "0" at the beginning if there is a single digit for each section 
      hour = ("0" + hour).slice(-2);
      min = ("0" + min).slice(-2);
      sec = ("0" + sec).slice(-2);

      //Setting up our clock

    clock.innerHTML = `<b>Today is:</b> <span class="fancy_link">${day}, ${date}th ${month} ${year}, ${hour}:${min}:${sec} ${MV}</span>`

}
setInterval(() =>{
  showTime()
},1000);


// SHOW WEATHER IN YOUR CURRENT LOCATION

const showCurrentWeather =(lat,lon) =>{
  var url1 = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  fetch(url1)
  .then(res => res.json())
  .then(data => {
    console.log(data);
      let cityName = data.name === "Saint-Raymond" ? "Montreal" : data.name;
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
    
})

}

// Get geolocation
if('geolocation' in navigator) {
  console.log('geolocation is available');
  navigator.geolocation.getCurrentPosition(position =>{
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    showCurrentWeather(lat,lon);
  })
} else {
  console.log('geolocation is not available')
}
