function currentTime(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dateNow = days[date.getDay()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let currentDate = `${dateNow} ${hours}:${minutes}`;
  let current = document.querySelector("#current-time");
  current.innerHTML = currentDate;
}
currentTime(new Date());

function searchResult(event) {
  event.preventDefault();
  let input = document.querySelector("#site-search");
  let city = document.querySelector("#city");
  city.innerHTML = input.value;
}

let form = document.querySelector("#form");
form.addEventListener("submit", searchResult);

function converter(event) {
  event.preventDefault();
  let celsium = document.querySelector("#data-celsium");
  let fahrenheitInner = document.querySelector("#fahrenheit");
  let fahrenheit = (parseInt(celsium.innerHTML) * 9) / 5 + 32;
  fahrenheitInner.innerHTML = `/ ${Math.round(fahrenheit)} °F`;
}
let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", converter);

function wheather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#data-celsium").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#desc").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#pressure").innerHTML = response.data.main.pressure;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector(
    "#innerbackgr-wheather"
  ).style.backgroundImage = `url(http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png)`;
  wheatherImg();
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "c3a2fe64882b7436809dcf1359b31cce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(wheather);
}

function btnSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#site-search").value;
  searchCity(city);
}

function getLocation(position) {
  let apiKey = "c3a2fe64882b7436809dcf1359b31cce";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(wheather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let resultForm = document.querySelector("#form");
resultForm.addEventListener("submit", btnSubmit);

let currLocation = document.querySelector("#current-location");
currLocation.addEventListener("click", getCurrentLocation);

function wheatherImg() {
  let decs = document.querySelector("#desc").innerHTML;
  let backgr = document.querySelector("#backgr-wheather");
  if (
    decs.toLowerCase() === "clouds" ||
    decs.toLowerCase() === "rain" ||
    decs.toLowerCase() === "fog"
  ) {
    backgr.style.backgroundImage = "url(./images/d-cloud.png)";
  } else if (decs.toLowerCase() === "sun") {
    backgr.style.backgroundImage = "url(./images/d-sun.png)";
  } else {
    backgr.style.backgroundImage = "url(./images/d-partly.png)";
  }
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col">
          <div class="d-flex flex-column align-items-center">
            <div class="day">${formatDay(forecastDay.dt)}</div>
            <div class="pic">
              <img src="http://openweathermap.org/img/wn/${
                forecastDay.weather[0].icon
              }@2x.png" alt="" width="30">
            </div>
            <div class="temp">
                <span class="temp-max">${Math.round(
                  forecastDay.temp.max
                )}°C</span>
                <span class="temp-min">${Math.round(
                  forecastDay.temp.min
                )}°C</span>
            </div>
          </div>
        </div>
        `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

searchCity("Kyiv");
