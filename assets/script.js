const cityName = document.getElementById("city");
const nameEl = document.querySelector(".name");
const today = dayjs().format('MM/DD/YYYY');
const dataEl = document.querySelector(".data");

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
                                dataEl.innerHTML = `Current temp: ${data.main.temp} F<br>High: ${data.main.temp_max} F<br>Low: ${data.main.temp_min} F<br>Wind: ${data.wind.speed} mph<br>Humidity: ${data.main.humidity}% rh`;
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
                                document.querySelector(".day1").innerHTML = `${data.list[4].dt_txt}<br>Temp: ${data.list[4].main.temp} F<br>Wind: ${data.list[4].wind.speed} mph<br>Humidity: ${data.list[4].main.humidity}% rh`;

                                document.querySelector(".day2").innerHTML = `${data.list[12].dt_txt}<br>Temp: ${data.list[12].main.temp} F<br>Wind: ${data.list[12].wind.speed} mph<br>Humidity: ${data.list[12].main.humidity}% rh`;

                                document.querySelector(".day3").innerHTML = `${data.list[20].dt_txt}<br>Temp: ${data.list[20].main.temp} F<br>Wind: ${data.list[20].wind.speed} mph<br>Humidity: ${data.list[20].main.humidity}% rh`;

                                document.querySelector(".day4").innerHTML = `${data.list[28].dt_txt}<br>Temp: ${data.list[28].main.temp} F<br>Wind: ${data.list[28].wind.speed} mph<br>Humidity: ${data.list[28].main.humidity}% rh`;

                                document.querySelector(".day5").innerHTML = `${data.list[36].dt_txt}<br>Temp: ${data.list[36].main.temp} F<br>Wind: ${data.list[36].wind.speed} mph<br>Humidity: ${data.list[36].main.humidity}% rh`;
                            })
                        }
                    })
                };
                getWeatherForecast();
            })
        }
    })
};

function storeCity() {
    localStorage.setItem("storedCity", JSON.stringify(cityName));
};

function weatherSearch() {
    console.log(cityName);
    storeCity();
    getCoords();
}

const storedCityName = JSON.parse(localStorage.getItem("storedCity"));

//new api request for when user clicks on history:

"http://api.openweathermap.org/geo/1.0/direct?q=" + storedCityName + "&limit=3&appid=841bff87cafe164f0f5f33bd44701bfc";
