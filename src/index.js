function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let conditionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#current-icon");

  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;
  let condition = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let wind = Math.round(response.data.wind.speed);
  let icon = response.data.condition.icon_url;

  cityElement.innerHTML = city;
  temperatureElement.innerHTML = temperature;
  conditionElement.innerHTML = condition;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${wind} km/h`;
  iconElement.innerHTML = `<img src="${icon}" alt="${condition}" class="current-icon" />`;
}

function searchCity(city) {
  let apiKey = "813odac11b027491ee76f5at4885a44a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  searchCity(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return `${days[day]} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);

searchCity("Paris");
