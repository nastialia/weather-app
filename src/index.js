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

function showTemperature(response) {
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
  if (description === "Rain") {
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
}

let celsiusTemperature = null; 

function showCity(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#city-input");
  let city = inputCity.value;
  let units = "metric";
  let apiKey = "6c6a0284a7f6595d0113dad9dc3b9e69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  document.getElementById("icon-today").removeAttribute("class");
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
