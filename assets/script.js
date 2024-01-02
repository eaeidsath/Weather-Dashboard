const cityName = document.getElementById("city");
const nameEl = document.querySelector(".name");
const today = dayjs().format('MM/DD/YYYY');
const dataEl = document.querySelector(".data");
const clearButton = document.getElementById("clearButton");

var savedCities = [];

//fetch request for search function
function getCoords() {
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName.value + "&limit=3&appid=841bff87cafe164f0f5f33bd44701bfc";

    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                const lat = data[0].lat;
                const lon = data[0].lon;
                nameEl.innerHTML = data[0].name + ", " + data[0].state + " " + today;
                function getCurrentWeather() {
                    let requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=841bff87cafe164f0f5f33bd44701bfc&units=imperial";
                
                    fetch(requestUrl).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                console.log(data);
                                dataEl.innerHTML = `<img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png><br>${data.weather[0].description}<br>Current temp: ${data.main.temp} F<br>High: ${data.main.temp_max} F<br>Low: ${data.main.temp_min} F<br>Wind: ${data.wind.speed} mph<br>Humidity: ${data.main.humidity}% rh`;
                            })
                        }
                    })
                };
                getCurrentWeather();
                function getWeatherForecast() {
                    let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=841bff87cafe164f0f5f33bd44701bfc&units=imperial&cnt";
                
                    fetch(requestUrl).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                console.log(data);
                                document.querySelector(".day1").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png><br>${data.list[4].dt_txt}<br>${data.list[4].weather[0].description}<br>Temp: ${data.list[4].main.temp} F<br>Wind: ${data.list[4].wind.speed} mph<br>Humidity: ${data.list[4].main.humidity}% rh`;

                                document.querySelector(".day2").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[12].weather[0].icon}@2x.png><br>${data.list[12].dt_txt}<br>${data.list[12].weather[0].description}<br>Temp: ${data.list[12].main.temp} F<br>Wind: ${data.list[12].wind.speed} mph<br>Humidity: ${data.list[12].main.humidity}% rh`;

                                document.querySelector(".day3").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[20].weather[0].icon}@2x.png><br>${data.list[20].dt_txt}<br>${data.list[20].weather[0].description}<br>Temp: ${data.list[20].main.temp} F<br>Wind: ${data.list[20].wind.speed} mph<br>Humidity: ${data.list[20].main.humidity}% rh`;

                                document.querySelector(".day4").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[28].weather[0].icon}@2x.png><br>${data.list[28].dt_txt}<br>${data.list[28].weather[0].description}<br>Temp: ${data.list[28].main.temp} F<br>Wind: ${data.list[28].wind.speed} mph<br>Humidity: ${data.list[28].main.humidity}% rh`;

                                document.querySelector(".day5").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[36].weather[0].icon}@2x.png><br>${data.list[36].dt_txt}<br>${data.list[36].weather[0].description}<br>Temp: ${data.list[36].main.temp} F<br>Wind: ${data.list[36].wind.speed} mph<br>Humidity: ${data.list[36].main.humidity}% rh`;
                            })
                        }
                    })
                };
                getWeatherForecast();
            })
        }
    })
};

//prints search history onto page
function renderCities() {
    var li = document.createElement("li");

    li.innerHTML = `<button class="btn btn-light" onclick="seeHistory(event)" value="${cityName.value}">${cityName.value}</button>`;
    document.querySelector(".history").appendChild(li);
}

//stores search history in local storage
function storeCity() {
    localStorage.setItem("storedCities", JSON.stringify(savedCities));
};

//combines previous functions into one
function weatherSearch() {
    console.log(cityName);
    savedCities.push(cityName.value);
    storeCity();
    getCoords();
    renderCities();
}

//prints stored search history on page load
function init() {
    const storedCities = JSON.parse(localStorage.getItem("storedCities"));
    if (storedCities !== null) {
        savedCities = storedCities;
        for (var i = 0; i < storedCities.length; i++) {
            var li = document.createElement("li");

            li.innerHTML = `<button class="btn btn-light" onclick="seeHistory(event)" value="${storedCities[i]}">${storedCities[i]}</button>`;
            document.querySelector(".history").appendChild(li);
        }
    }
}
init();

//runs new fetch request when clicking on search history
function seeHistory(event) {
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + event.target.value + "&limit=3&appid=841bff87cafe164f0f5f33bd44701bfc";

    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                const lat = data[0].lat;
                const lon = data[0].lon;
                nameEl.innerHTML = data[0].name + ", " + data[0].state + " " + today;
                function getCurrentWeather() {
                    let requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=841bff87cafe164f0f5f33bd44701bfc&units=imperial";
                
                    fetch(requestUrl).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                console.log(data);
                                dataEl.innerHTML = `<img src=https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png><br>${data.weather[0].description}<br>Current temp: ${data.main.temp} F<br>High: ${data.main.temp_max} F<br>Low: ${data.main.temp_min} F<br>Wind: ${data.wind.speed} mph<br>Humidity: ${data.main.humidity}% rh`;
                            })
                        }
                    })
                };
                getCurrentWeather();
                function getWeatherForecast() {
                    let requestUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=841bff87cafe164f0f5f33bd44701bfc&units=imperial&cnt";
                
                    fetch(requestUrl).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                console.log(data);
                                document.querySelector(".day1").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png><br>${data.list[4].dt_txt}<br>${data.list[4].weather[0].description}<br>Temp: ${data.list[4].main.temp} F<br>Wind: ${data.list[4].wind.speed} mph<br>Humidity: ${data.list[4].main.humidity}% rh`;

                                document.querySelector(".day2").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[12].weather[0].icon}@2x.png><br>${data.list[12].dt_txt}<br>${data.list[12].weather[0].description}<br>Temp: ${data.list[12].main.temp} F<br>Wind: ${data.list[12].wind.speed} mph<br>Humidity: ${data.list[12].main.humidity}% rh`;

                                document.querySelector(".day3").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[20].weather[0].icon}@2x.png><br>${data.list[20].dt_txt}<br>${data.list[20].weather[0].description}<br>Temp: ${data.list[20].main.temp} F<br>Wind: ${data.list[20].wind.speed} mph<br>Humidity: ${data.list[20].main.humidity}% rh`;

                                document.querySelector(".day4").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[28].weather[0].icon}@2x.png><br>${data.list[28].dt_txt}<br>${data.list[28].weather[0].description}<br>Temp: ${data.list[28].main.temp} F<br>Wind: ${data.list[28].wind.speed} mph<br>Humidity: ${data.list[28].main.humidity}% rh`;

                                document.querySelector(".day5").innerHTML = `<img src=https://openweathermap.org/img/wn/${data.list[36].weather[0].icon}@2x.png><br>${data.list[36].dt_txt}<br>${data.list[36].weather[0].description}<br>Temp: ${data.list[36].main.temp} F<br>Wind: ${data.list[36].wind.speed} mph<br>Humidity: ${data.list[36].main.humidity}% rh`;
                            })
                        }
                    })
                };
                getWeatherForecast();
            })
        }
    })
};

//clears search history and reloads page
clearButton.addEventListener("click", function(event) {
    event.preventDefault();
    savedCities = [];
    localStorage.clear();
    location.reload();
    init();
});