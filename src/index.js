function formatDate(timestamp) {
  let date = new Date(timestamp * 1000);
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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
        <div class="weather-forecast-day">
          <div>${formatDay(day.time)}</div>
          <img
            src="${day.condition.icon_url}"
            alt="${day.condition.description}"
            class="weather-forecast-icon"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature"><strong>${Math.round(
              day.temperature.maximum,
            )}°</strong></span>
            <span class="weather-forecast-temperature">${Math.round(
              day.temperature.minimum,
            )}°</span>
          </div>
        </div>
      `;
    }
  });

  forecastElement.innerHTML = forecastHtml;
}

function getForecast(coordinates) {
  let apiKey = "813odac11b027491ee76f5at4885a44a";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let conditionElement = document.querySelector("#current-condition");
  let humidityElement = document.querySelector("#current-humidity");
  let windElement = document.querySelector("#current-wind");
  let iconElement = document.querySelector("#current-icon");
  let dateElement = document.querySelector("#current-date");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  conditionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.time);

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="${response.data.condition.description}" class="current-icon" />`;

  getForecast(response.data.coordinates);
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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

searchCity("Paris");
