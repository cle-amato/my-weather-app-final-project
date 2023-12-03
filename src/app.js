function refreshWeather(response) {
  let cityElement = document.querySelector("#city");

  let currentTemperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector(".current-temperature");

  let feelsLikeElement = document.querySelector("#feels-like-temperature");
  let actualFeelsLike = Math.round(response.data.temperature.feels_like);

  let conditionELement = document.querySelector("#description");
  let conditionDescription = response.data.condition.description;

  let windSpeedElement = document.querySelector("#wind-speed");
  let currentWindSpeed = Math.round(response.data.wind.speed * 3.6);

  let humidityElement = document.querySelector("#humidity");
  let currentHumidity = `${response.data.temperature.humidity}%`;

  let currentDateElement = document.querySelector("#current-day-time");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  let weatherIcon = `<img src="${response.data.condition.icon_url}" class ="weather-app-icon"/>`;

  cityElement.innerHTML = response.data.city;
  currentDateElement.innerHTML = formatDate(date);
  iconElement.innerHTML = weatherIcon;
  temperatureElement.innerHTML = currentTemperature;
  feelsLikeElement.innerHTML = actualFeelsLike;
  conditionELement.innerHTML = conditionDescription;
  windSpeedElement.innerHTML = currentWindSpeed;
  humidityElement.innerHTML = currentHumidity;

  getForecast(response.data.city);
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
  searchCity(cityInput.value);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = `ca0094f431ob9cbfef2ed6ce95bt0cc7`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml =
        forecastHtml +
        `<div class="col-2">
         <div class="weather-forecast-day">
              <div class="weather-forecast-date">${formatDay(day.time)}</div>
              <div class="forecast-icon">
              <img src="${day.condition.icon_url}" class="forecast-icon"/></div>
              <div class="temperature-forecast">
                <span class="temperature-forecast-max">${Math.round(
                  day.temperature.maximum
                )}°</span>
                <span class="temperature-forecast-min">${Math.round(
                  day.temperature.minimum
                )}°</span>
              </div>
            </div>
            </div>   
`;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#search-city-form");
form.addEventListener("submit", handleSearch);

searchCity("Rome");
