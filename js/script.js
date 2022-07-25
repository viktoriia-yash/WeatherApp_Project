// Date and time
let ourDate = new Date();
let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDayName = weekDay[ourDate.getDay()];

let monthDayNumber = ourDate.getDate();
if (monthDayNumber < 10) {
  monthDayNumber = `0${monthDayNumber}`;
}

let hour = ourDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = ourDate.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let time = document.querySelector("h3");
time.innerHTML = `${weekDayName} ${monthDayNumber}, ${hour}:${minute}`;

// All we need
function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1766cbbe43ef71cdc8ece5c867ddb581";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function weatherAllInformation(response) {
  temperatureData = response.data.main.temp;
  let ourTemp = Math.round(temperatureData);
  let displayTemp = document.querySelector("#temperatureNumber");
  displayTemp.innerHTML = `${ourTemp}`;

  let ourCity = document.querySelector("#cityName");
  ourCity.innerHTML = response.data.name;

  let description = document.querySelector("#description");
  description.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${response.data.main.humidity}`;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${Math.round(response.data.wind.speed)}`;

  let iconElement = document.querySelector("#icon-w");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

let temperatureData = null;

// City Search
function search(city) {
  let apiKey = "1766cbbe43ef71cdc8ece5c867ddb581";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherAllInformation);
}

function searchCitySubmit(event) {
  event.preventDefault();
  let citySearchBar = document.querySelector("#searchBar");
  search(citySearchBar.value);
}

search("Rome");

let showCityOne = document.querySelector("#searchThings");
showCityOne.addEventListener("submit", searchCitySubmit);

let showCityTwo = document.querySelector("#searchButton");
showCityTwo.addEventListener("click", searchCitySubmit);

// current location

function showMeCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "1766cbbe43ef71cdc8ece5c867ddb581";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherAllInformation);
}

function currLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMeCurrentLocation);
}

let currentLocation = document.querySelector("#locationButton");
currentLocation.addEventListener("click", currLocation);

// cel to fah and vice versa
function temperatureFah(event) {
  event.preventDefault();
  let temperatureC = document.querySelector("#temperatureNumber");
  let tempFah = (temperatureData * 9) / 5 + 32;
  temperatureC.innerHTML = Math.round(tempFah);
}

let fahToCel = document.querySelector("#fahrenheit");
fahToCel.addEventListener("click", temperatureFah);

function temperatureCel(event) {
  event.preventDefault();
  let temperatureF = document.querySelector("#temperatureNumber");
  temperatureF.innerHTML = Math.round(temperatureData);
}

let celToFah = document.querySelector("#celsius");
celToFah.addEventListener("click", temperatureCel);

// Weather forecast and almost everything I need for it
function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="day-one">
  <div class="day">${formatDayForecast(forecastDay.dt)}</div>
  <div class="icon"><img
  src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
  alt="icon weather"
  id="icon-w"
/></div>
  <div class="number-max">${Math.round(
    forecastDay.temp.max
  )}° </div><div class="number-min">${Math.round(forecastDay.temp.min)}°</div>
</div>`;
    }
  });
  forecastElement.innerHTML = forecastHTML;
}
