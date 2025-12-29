function updateWeatherData(response){
    //console.groupCollapsed(response.data);
    //console.log(response.data.temperature.current);
    //console.log(response.data.condition.description);
    let temperatureElement = document.querySelector("#temp");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city"); 
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#windSpeed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");

    cityElement.innerHTML = response.data.city;
    temperatureElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed} km\h`;
    timeElement.innerHTML = formatDate(date);
    //if not using the function formatDate^^^^timeElement.innerHTML = `${date.getDay()} ${date.getHours()}:${date.getMinutes()}`;
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="bosa-app-icon" />`;

    getForecast(response.data.city);  
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city){
let apiKey =  "b2a5adcct04b33178913oc335f405433";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeatherData);
}

function handleSearchSubmit(event){
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
   // let cityElement = document.querySelector("#city");
    //cityElement.innerHTML = searchInput.value; 
    searchCity(searchInput.value);
}

function getForecast(city){
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl= `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000);
  let days = ["Sun",  "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function displayForecast(response){
    
    //let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]; //array of the days
    let forecastHtml = "";
    response.data.daily.forEach(function(day, index){ //loop through days 1 at a time
      if(index < 6){  
      forecastHtml = forecastHtml + `
          <div class="bosa-app-forecast-day">
              <div class="bosa-app-forecast-date">${formatDay(day.time)}</div>
              <img src="${day.condition.icon_url}" class="bosa-app-forecast-icon"/>
              <div class="bosa-app-forecast-temperatures">
                  <div class="bosa-app-forecast-temp"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
                  <div class="bosa-app-forecast-temp">${Math.round(day.temperature.minimum)}°</div>
          </div>
      </div>`;
      }
    });

    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}

searchCity("Francistown");

