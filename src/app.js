function refreshWeather(response) {
  let currentTemperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector(".current-temperature");
  temperatureElement.innerHTML = currentTemperature;
  let feelsLikeElement = document.querySelector("#feels-like-temperature");
  let actualFeelsLike = Math.round(response.data.temperature.feels_like);
  feelsLikeElement.innerHTML = actualFeelsLike;
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
