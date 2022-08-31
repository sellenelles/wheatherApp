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
  fahrenheitInner.innerHTML = `/ ${fahrenheit} °F`;
}
let toFahrenheit = document.querySelector("#fahrenheit");
toFahrenheit.addEventListener("click", converter);

function wheather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#celsium").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#desc").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  wheatherImg();
}

function searchCity(city) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(wheather);
}

function btnSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#site-search").value;
  searchCity(city);
}

function getLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
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
  let innerBackgr = document.querySelector("#innerbackgr-wheather");
  if (decs.toLowerCase() === "clouds" || decs.toLowerCase() === "rain") {
    backgr.style.backgroundImage = "url(./images/d-cloud.png)";
    innerBackgr.style.backgroundImage = "url(./images/rain.png)";
  } else if (decs.toLowerCase() === "sun") {
    backgr.style.backgroundImage = "url(./images/d-sun.png)";
    innerBackgr.style.backgroundImage = "url(./images/sun.png)";
  } else {
    backgr.style.backgroundImage = "url(./images/d-partly.png)";
    innerBackgr.style.backgroundImage = "url(./images/cloud.png)";
  }
}
