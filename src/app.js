function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = cityInput.value;
}

let form = document.querySelector("#search-city-form");

form.addEventListener("submit", searchCity);
