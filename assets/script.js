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
                                dataEl.innerHTML = `Current temp: ${data.main.temp} F<br>High: ${data.main.temp_max} F<br>Low: ${data.main.temp_min} F<br>Wind: ${data.wind.speed} mph<br>Humidity: ${data.main.humidity} %rh`;
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
