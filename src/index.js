function updateWeatherData(response){
    console.groupCollapsed(response.data);
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
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = searchInput.value; 
    searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Francistown");
