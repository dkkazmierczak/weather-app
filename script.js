//Date
let now = new Date()
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
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
}

function showTemperature(response) {
  document.querySelector("#temp-heading").innerHTML = `${Math.round(response.data.main.temp)}°`
  //celsiusUnit.classList.add("active")
  //fahrenheitUnit.classList.remove("active")
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

//Function formating to hours
function formatHours(x) {
  let date = new Date(x * 1000)
  let hours = date.toLocaleString(`en-US`, { hour: `numeric`, hour12: true })

  return hours
}

//Function displaying first 5 hours of forecast
function displayFirstForecast(response) {
  let forecast = response.data.hourly
  let firstForecast = document.querySelector("#first-forecast")
  let forecastHTML = `<div class="row">`

  forecast.forEach(function (forecastHour, index) {
    let temp = `${Math.round(forecastHour.temp)}`
    let firstForecastTemp = document.querySelector(".firstForecastTemp")


    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col p-2">
      <div class="time">${formatHours(forecastHour.dt)}</div>
      <div class="icon">
      <img 
        src="http://openweathermap.org/img/wn/${forecastHour.weather[0].icon}@2x.png" 
        alt="" 
        width="30"/>
      </div>
      <div class="firstForecastTemp">${temp}°</div>
    </div>
  `
    }

  })
  forecastHTML = forecastHTML + `</div>`

  firstForecast.innerHTML = forecastHTML
}

//Function displaying hourly forecast
function displayHourlyForecast(response) {
  let forecast = response.data.hourly
  let hourlyForecast = document.querySelector("#hourly-forecast")
  let forecastHTML = `<div class="table-responsive-sm shadow"><table class="table"><tbody><tr>`

  forecast.forEach(function (forecastHour, index) {
    if (index > 5 && index < 25) {
      forecastHTML = forecastHTML + ` <td>${formatHours(forecastHour.dt)}</td>`
    }
  })

  forecastHTML = forecastHTML + `</tr><tr>`

  forecast.forEach(function (forecastHour, index) {
    if (index > 5 && index < 25) {
      forecastHTML =
        forecastHTML +
        `<td>
        <img src="http://openweathermap.org/img/wn/${forecastHour.weather[0].icon}@2x.png" alt="" width="30"/>
        </td>`
    }
  })

  forecastHTML = forecastHTML + `</tr><tr>`

  forecast.forEach(function (forecastHour, index) {
    if (index > 5 && index < 25) {
      forecastHTML =
        forecastHTML +
        `<td class="temperature">${Math.round(forecastHour.temp)}°</td>`
    }
  })

  forecastHTML = forecastHTML + `</tr></tbody></table></div>`

  hourlyForecast.innerHTML = forecastHTML
}

//Function formating date for the foreast
function formatDay(x) {
  let date = new Date(x * 1000)
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]
  let day = days[date.getDay()]

  return day
}

//Function displaying daily forecast
function displayDailyForecast(response) {
  let forecast = response.data.daily
  let dailyForecast = document.querySelector("#daily-forecast")
  let forecastHTML = `<table class="table table-sm shadow"><caption>Weather in the next days</caption>`

  forecast.forEach(function (forecastDay, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        ` 
      <tbody>
          <tr>
            <th scope="row">${formatDay(forecastDay.dt)}</th>
            <td>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" width="30"/>
            </td>
            <td class="minTempDaily">${Math.round(
              forecastDay.temp.min
            )}°</td>
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
  let apiKey = "e2e761297b5d8c34616696904be5d3a8"
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely&appid=${apiKey}&units=metric`

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

  /*celsiusTemperature = response.data.main.temp
  celsiusMaxTemp = response.data.main.temp_max
  celsiusMinTemp = response.data.main.temp_min*/
}

//Function searching info about the city
function searchCity(city) {
  let apiKey = "e2e761297b5d8c34616696904be5d3a8"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

  if (city) {
    axios.get(`${apiUrl}`).then(displayInfo)
  } else {
    alert("Please type a city")
  }
}

//Function that's receiving city
function handleSubmit(event) {
  event.preventDefault()
  let city = document.querySelector("#search-city-input").value
  searchCity(city)
}

//Function displaying info about the current city
function showPosition(position) {
  let lat = position.coords.latitude
  let lon = position.coords.longitude
  let apiKey = "e2e761297b5d8c34616696904be5d3a8"
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

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

let currentLocationBtn = document.querySelector(".currentLocation")
currentLocationBtn.addEventListener("click", getLocation)

let form = document.querySelector("#search-city")
form.addEventListener("submit", handleSubmit)

//default
searchCity("Halden")

//Function showing fahrenheit temp. after clicking the "F" link
/*function showFahrenheitTemperature(event) {
  event.preventDefault()
  celsiusUnit.classList.remove("active")
  fahrenheitUnit.classList.add("active")
  document.querySelector("#temp-heading").innerHTML = `${Math.round(
    (celsiusTemperature * 9) / 5 + 32
  )}°`
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    (celsiusMaxTemp * 9) / 5 + 32
  )}°F`
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    (celsiusMinTemp * 9) / 5 + 32
  )}°F`
}

//Function showing celsius temp. after clicking the "C" link
function showCelsiusTemperature(event) {
  event.preventDefault()
  celsiusUnit.classList.add("active")
  fahrenheitUnit.classList.remove("active")
  document.querySelector("#temp-heading").innerHTML = `${Math.round(
    celsiusTemperature
  )}°`
  document.querySelector("#max-temp").innerHTML = `${Math.round(
    celsiusMaxTemp
  )}°C`
  document.querySelector("#min-temp").innerHTML = `${Math.round(
    celsiusMinTemp
  )}°C`
}

let celsiusTemperature = null
let celsiusMaxTemp = null
let celsiusMinTemp = null

let fahrenheitUnit = document.querySelector("#fahrenheit-unit")
fahrenheitUnit.addEventListener("click", showFahrenheitTemperature)

let celsiusUnit = document.querySelector("#celsius-unit")
celsiusUnit.addEventListener("click", showCelsiusTemperature)
*/
