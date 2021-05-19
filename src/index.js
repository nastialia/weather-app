let now = new Date();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
} 
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
} 

let days = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT"
];
let day = days[now.getDay()];

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${day}, ${hours}:${minutes}`;


let symbol = document.querySelector("#temperature-symbol"); 
let temperatureElement = document.querySelector("#temperature-today");

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
  "SUN",
  "MON",
  "TUE",
  "WED",
  "THU",
  "FRI",
  "SAT"
];
return days[day]; 
}


let iconOther = null; 

function showForecast(response) {
  let dailyForecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<div class="row">`;
  dailyForecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      let forecastDescription = forecastDay.weather[0].main;
      if (forecastDescription === "Rain") {
        iconOther = `<i class="bi bi-cloud-rain other-days-icon"></i>`;
      } else if (forecastDescription === "Clouds") {
        iconOther = `<i class="bi bi-cloud other-days-icon"></i>`;
      } else if (forecastDescription === "Thunderstorm") {
        iconOther = `<i class="bi bi-cloud-lightning-rain other-days-icon"></i>`;
      } else if (forecastDescription === "Drizzle") {
        iconOther = `<i class="bi bi-cloud-drizzle other-days-icon"></i>`;
      } else if (forecastDescription === "Clear") {
        iconOther = `<i class="bi bi-sun other-days-icon"></i>`;
      } else if (forecastDescription === "Snow") {
        iconOther = `<i class="bi bi-snow other-days-icon"></i>`;
      }
      forecastHTML =
        forecastHTML +
        `<div class="col other-days-info">${iconOther}<br />${formatDay(forecastDay.dt)} <br /> ${Math.round(forecastDay.temp.min)}°C/${Math.round(forecastDay.temp.max)}°C</div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}


function getForecast(coordinates) {
  let units = "metric";
  let apiKey = "6c6a0284a7f6595d0113dad9dc3b9e69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function showTemperature(response) {
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  celsiusTemperature = response.data.main.temp;
  console.log(response);
  temperatureElement.innerHTML = temperature;
  let description = document.querySelector("#temperature-description");
  description.innerHTML = response.data.weather[0].main;
  let wind = document.querySelector("#today-wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)} m/s`;
  let cloudiness = document.querySelector("#today-cloudiness");
  cloudiness.innerHTML = `${response.data.clouds.all} %`;
  let humidity = document.querySelector("#today-humidity");
  humidity.innerHTML = `${response.data.main.humidity} %`;
  if (description.innerHTML === "Rain")
  {
    description.innerHTML = "rainy";
    document.getElementById("background").style.backgroundImage = 'linear-gradient(to top, #dfe9f3 0%, white 100%)';
    document.getElementById('icon-today').classList.add('bi', 'bi-cloud-rain', 'today-icon-rainy');
  }  
  else if (description.innerHTML === "Clouds")
  {
    description.innerHTML = "cloudy";
    document.getElementById("background").style.backgroundImage = `linear-gradient(to top, #fff1eb 0%, #ace0f9 100%)`;
    document.getElementById('icon-today').classList.add('bi', 'bi-cloud', 'today-icon-cloudy');
  }  
  else if (description.innerHTML === "Thunderstorm")  
  {
    description.innerHTML = "stormy";
    document.getElementById("background").style.backgroundImage = 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)';
    document.getElementById('icon-today').classList.add('bi', 'bi-cloud-lightning-rain', 'today-icon-rainy');
  } 
  else if (description.innerHTML === "Drizzle") {
    description.innerHTML = "rainy";
    document.getElementById("background").style.backgroundImage = 'linear-gradient(to top, #dfe9f3 0%, white 100%)'; 
    document.getElementById('icon-today').classList.add('bi', 'bi-cloud-drizzle', 'today-icon-rainy');
  }
  else if (description.innerHTML === "Clear") {
    description.innerHTML = "clear";
    document.getElementById("background").style.backgroundImage = `radial-gradient(73% 147%, #EADFDF 59%, #ECE2DF 100%), radial-gradient(91% 146%, rgba(255,255,255,0.50) 47%, rgba(0,0,0,0.50) 100%)`; 
    document.getElementById('icon-today').classList.add('bi', 'bi-sun', 'today-icon-clear');
  }
  else if (description.innerHTML === "Snow") {
    description.innerHTML = "snowy";
    document.getElementById("background").style.backgroundImage = 'background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%)';
    document.getElementById('icon-today').classList.add('bi', 'bi-snow', 'today-icon-snowy');
  }
  // if (hours < 5 || hours >= 21) {
  //   document.body.classList.add("night-mode");
  //   document.getElementById('icon-today').classList.add("night-mode");
  //   document.getElementById('min-temp').classList.add("night-mode");
  //   document.getElementById('max-temp').classList.add("night-mode");
  //   document.getElementById('temperature-description').classList.add("night-mode");
  //   document.getElementById('temperature-today').classList.add("night-mode");
  //   document.getElementById('temperature-symbol').classList.add("night-mode");
  //   document.getElementById('today-cloudiness').classList.add("night-mode");
  //   document.getElementById('today-wind').classList.add("night-mode");
  //   document.getElementById('today-humidity').classList.add("night-mode");
  //   document.getElementById('cloudiness').classList.add("night-mode");
  //   document.getElementById('wind').classList.add("night-mode");
  //   document.getElementById('humidity').classList.add("night-mode");
  //   document.getElementById('weather-forecast').classList.add("night-mode");
  //   document.getElementById('city-description-style').classList.add("night-mode");
  // document.getElementById("background").style.backgroundImage =
  //     "linear-gradient(to top, #1E3C72 0%, #1E3C72 1%, #2A5298 100%)";
  // }
let minTemp = document.querySelector("#min-temp");
minTemp.innerHTML = `${Math.round(response.data.main.temp_min)}°C/`;
let maxTemp = document.querySelector("#max-temp");
maxTemp.innerHTML = `${Math.round(response.data.main.temp_max)}°C`;
document.querySelector("#city-input").value = response.data.name;
getForecast(response.data.coord);

}



let celsiusTemperature = null; 

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  searchCity(inputCity.value);
  document.getElementById("icon-today").removeAttribute("class");
}
function searchCity(city) {
  let units = "metric";
  let apiKey = "6c6a0284a7f6595d0113dad9dc3b9e69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", showCity);


function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-today");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  symbol.innerHTML = "°F";
}

function convertToCelsius(event) {
  event.preventDefault();
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  symbol.innerHTML = "°C";
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

searchCity("Berlin, Germany");
