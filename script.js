//Date
const now = new Date()
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
const day = days[now.getDay()]
const hours = now.getHours()
const minutes = now.getMinutes()
const today = document.querySelector("#today-date")

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
}

function showTemperature(response) {
  document.querySelector("#temp-heading").innerHTML = `<img 
        src="http://openweathermap.org/img/wn/${
          response.data.weather[0].icon
        }@2x.png" 
        alt="" 
        width="60"/>${Math.round(response.data.main.temp)}°`

  document.querySelector("#feels-like").innerHTML = `${
    Math.round(response.data.main.feels_like * 10) / 10
  }°C`
}

function showSky(response) {
  document.querySelector("#sky-description").innerHTML =
    response.data.weather[0].description
}

function showMaxTemp(response) {
  document.querySelector("#max-temp").innerHTML = `${
    Math.round(response.data.main.temp_max * 10) / 10
  } °C`
}

function showMinTemp(response) {
  document.querySelector("#min-temp").innerHTML = `${
    Math.round(response.data.main.temp_min * 10) / 10
  } °C`
}

function showHumidity(response) {
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}`
}

/*const showWindSpeed = (response) => {
    document.querySelector("#wind-speed").innerHTML = `${
    Math.round(response.data.wind.speed * 10) / 10
  }`
} 
*/

function showWindSpeed(response) {
  document.querySelector("#wind-speed").innerHTML = `${
    Math.round(response.data.wind.speed * 10) / 10
  }`
}

//Function formating to hours
function formatHours(x) {
  const date = new Date(x * 1000)
  const hours = date.getHours()

  return hours
}

//Function displaying first 5 hours of forecast
function displayFirstForecast(response) {
  const forecast = response.data.hourly
  const firstForecast = document.querySelector("#first-forecast")
  let forecastHTML = `<div class="row px-3 py-0">`

  forecast.forEach(function (forecastHour, index) {
    const temp = `${Math.round(forecastHour.temp)}`
    const firstForecastTemp = document.querySelector(".firstForecastTemp")

    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col p-2">
          <div>${formatHours(forecastHour.dt)}:00</div>
          <div><img src="http://openweathermap.org/img/wn/${forecastHour.weather[0].icon}@2x.png" width="40"/></div>
          <div>${temp}°</div>
        </div>`
    }
  })
  forecastHTML = forecastHTML + `</div>`

  firstForecast.innerHTML = forecastHTML
}

//Function displaying hourly forecast
function displayHourlyForecast(response) {
  const forecast = response.data.hourly
  const hourlyForecast = document.querySelector("#hourly-forecast")
  let forecastHTML = `<div class="table-responsive shadow"><table class="table"><tbody><tr>`

  forecast.forEach(function (forecastHour, index) {
    if (index > 5 && index < 25) {
      forecastHTML =
        forecastHTML + `<td>${formatHours(forecastHour.dt)}:00</td>`
    }
  })

  forecastHTML = forecastHTML + `</tr><tr>`

  forecast.forEach(function (forecastHour, index) {
    if (index > 5 && index < 25) {
      forecastHTML =
        forecastHTML +
        `<td>
        <img src="http://openweathermap.org/img/wn/${forecastHour.weather[0].icon}@2x.png" width="30"/>
        </td>`
    }
  })

  forecastHTML = forecastHTML + `</tr><tr>`

  forecast.forEach(function (forecastHour, index) {
    if (index > 5 && index < 25) {
      forecastHTML = forecastHTML + `<td>${Math.round(forecastHour.temp)}°</td>`
    }
  })

  forecastHTML = forecastHTML + `</tr></tbody></table></div>`

  hourlyForecast.innerHTML = forecastHTML
}

//Function formating date for the foreast
function formatDay(x) {
  const date = new Date(x * 1000)
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  const day = days[date.getDay()]

  return day
}

//Function displaying daily forecast
function displayDailyForecast(response) {
  const forecast = response.data.daily
  const dailyForecast = document.querySelector("#daily-forecast")
  let forecastHTML = `<table class="table table-sm shadow">`

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML + ` <tbody>
          <tr>
            <th scope="row">${formatDay(forecastDay.dt)}</th>
            <td><img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="30"/></td>
            <td class="min-temp-daily">${Math.round(forecastDay.temp.min)}°</td>
            <td>${Math.round(forecastDay.temp.max)}°</td>
          </tr>
        <tbody>
  `
    }
  })
  forecastHTML = forecastHTML + `</table>`

  dailyForecast.innerHTML = forecastHTML
}

function displayForecasts(response) {
  displayFirstForecast(response)
  displayHourlyForecast(response)
  displayDailyForecast(response)
  console.log(response.data)
}

function getForecast(coordinates) {
  const apiKey = "e2e761297b5d8c34616696904be5d3a8"
  const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely&appid=${apiKey}&units=metric`

  axios.get(apiUrl).then(displayForecasts)
}

//Function running all the displaying functions
function displayInfo(response) {
  showCity(response)
  showTemperature(response)
  showSky(response)
  showMaxTemp(response)
  showMinTemp(response)
  showHumidity(response)
  showWindSpeed(response)
  getForecast(response.data.coord)
}

//Function searching info about the city
function searchCity(city) {
  const apiKey = "e2e761297b5d8c34616696904be5d3a8"
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  if (city) {
    axios.get(`${apiUrl}`).then(displayInfo)
  } else {
    alert("Please type a city")
  }
}

//Function that's receiving city
function handleSubmit(event) {
  event.preventDefault()
  const city = document.querySelector("#search-city-input").value
  searchCity(city)
}

//Function displaying info about the current city
function showPosition(position) {
  const lat = position.coords.latitude
  const lon = position.coords.longitude
  const apiKey = "e2e761297b5d8c34616696904be5d3a8"
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

  axios.get(`${apiUrl}`).then(displayInfo)
}

//Function getting the current location, after clicking the location button
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition)
  } else {
    null
  }
}

const currentLocationBtn = document.querySelector("#current-location")
currentLocationBtn.addEventListener("click", getLocation)

const form = document.querySelector("#search-city")
form.addEventListener("submit", handleSubmit)

//default
searchCity("Halden")
