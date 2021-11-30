//Date
let now = new Date()
let days = ["Sunday", "Monday", "Tuesday", "Thursday", "Friday", "Saturday"]
let day = days[now.getDay()]
let hours = now.getHours()
let minutes = now.getMinutes()
let today = document.querySelector("#today-date")

if (minutes < 10) {
  today.innerHTML = `${day}, ${hours}:0${minutes}`
} else if (hours < 10) {
  today.innerHTML = `${day}, 0${hours}:${minutes}`
} else {
  today.innerHTML = `${day}, ${hours}:${minutes}`
}

//All the displaying functions
function showCity(response) {
  document.querySelector("#city").innerHTML = response.data.name
  console.log(response)
}

function showTemperature(response) {
  document.querySelector("#tempHeading").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`
}

function showSky(response) {
  document.querySelector("#sky-description").innerHTML =
    response.data.weather[0].description
}

function showMaxTemp(response) {
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    response.data.main.temp_max
  )} °C`
}

function showMinTemp(response) {
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    response.data.main.temp_min
  )} °C`
}

function showHumidity(response) {
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`
}

function showWindSpeed(response) {
  document.querySelector("#wind-speed").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`
}

//function getForecast(coordinates){
//  let apiKey = "e2e761297b5d8c34616696904be5d3a8"
//  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
//  axios.get(apiUrl).then(displayForecast);
//}

//DisplayInfo
function displayInfo(response) {
  showCity(response)
  showTemperature(response)
  showSky(response)
  showMaxTemp(response)
  showMinTemp(response)
  showHumidity(response)
  showWindSpeed(response)
 // getForecats(response.data.coord)
}

function searchCity(city) {
  let apiKey = "e2e761297b5d8c34616696904be5d3a8"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  if (city) {
    axios.get(`${apiUrl}`).then(displayInfo)
  } else {
    alert("Please type a city")
  }
}

function handleSubmit(event) {
  event.preventDefault()
  let city = document.querySelector("#search-city-input").value
  searchCity(city)
}

let form = document.querySelector("#search-city")
form.addEventListener("submit", handleSubmit)

//default
searchCity("Halden")

//Fahrenheit
function fahrenheitTemperature(event) {
  event.preventDefault()
  let temperature = document.querySelector(".tempHeading")
  temperature.innerHTML = "45°"
}

let fahrenheitUnit = document.querySelector("#fahrenheit-unit")
fahrenheitUnit.addEventListener("click", fahrenheitTemperature)

//Celsius
function celsiusTemperature(event) {
  event.preventDefault()
  let temperature = document.querySelector("#tempHeading")
  temperature.innerHTML = "7°"
}

let celsiusUnit = document.querySelector("#celsius-unit")
celsiusUnit.addEventListener("click", celsiusTemperature)

//Current Location
function showPosition(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let apiKey = "e2e761297b5d8c34616696904be5d3a8"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  axios.get(`${apiUrl}`).then(displayInfo)
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    null
  }
}

let currentLocationBtn = document.querySelector(".currentLocation")
currentLocationBtn.addEventListener("click", getLocation)
