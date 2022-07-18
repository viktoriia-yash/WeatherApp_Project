// Current Day and Time
let showDate = new Date();

let twelveMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = twelveMonths[showDate.getMonth()];

let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let weekDayName = weekDay[showDate.getDay()];

let monthDayNumber = showDate.getDate();
if (monthDayNumber < 10) {
  monthDayNumber = `0${monthDayNumber}`;
}

let hour = showDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = showDate.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let time = document.querySelector("h3");
time.innerHTML = `${weekDayName} ${monthDayNumber} ${month}, ${hour}:${minute}`;

// Details
function weatherAndDetails(response) {
  let cityN = document.querySelector("#cityName");
  cityN.innerHTML = response.data.name;

  temperatureData = response.data.main.temp;
  let realTemp = Math.round(temperatureData);
  let todayTemp = document.querySelector("#temperatureNumber");
  todayTemp.innerHTML = `${realTemp}`;

  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${response.data.wind.speed}`;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  let visibility = document.querySelector("#visibility");
  visibility.innerHTML = `Visibility: ${response.data.weather[0].description}`;
}

let temperatureData = null;

// City
function showMeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchBar");
  let cityHOne = document.querySelector("#cityName");
  cityHOne.innerHTML = searchInput.value;
  let apiKey = "1766cbbe43ef71cdc8ece5c867ddb581";
  let cityDisplay = `${searchInput.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(weatherAndDetails);
}

let showCityOne = document.querySelector("#searchThings");
showCityOne.addEventListener("submit", showMeCity);

let showCityTwo = document.querySelector("#searchButton");
showCityTwo.addEventListener("click", showMeCity);

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

// current location
function showMeCurLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "1766cbbe43ef71cdc8ece5c867ddb581";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(weatherAndDetails);
}

function butCurLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showMeCurLocation);
}

let curLocation = document.querySelector("#locationButton");
curLocation.addEventListener("click", butCurLocation);
