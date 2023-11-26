function refreshWeather(response) {
  let currentTemperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector(".current-temperature");

  let feelsLikeElement = document.querySelector("#feels-like-temperature");
  let actualFeelsLike = Math.round(response.data.temperature.feels_like);

  let conditionELement = document.querySelector("#description");
  let conditionDescription = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  let currentHumidity = `${response.data.temperature.humidity}%`;

  let currentDateElement = document.querySelector("#current-day-time");
  let date = new Date(response.data.time * 1000);

  currentDateElement.innerHTML = formatDate(date);
  temperatureElement.innerHTML = currentTemperature;
  feelsLikeElement.innerHTML = actualFeelsLike;
  conditionELement.innerHTML = conditionDescription;
  humidityElement.innerHTML = currentHumidity;
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let months = [
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
  let dateNumber = date.getDate();
  let month = months[date.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${dateNumber} ${month}, ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = `ca0094f431ob9cbfef2ed6ce95bt0cc7`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSearch);

searchCity("Rome");
