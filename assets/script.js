const cityName = document.getElementById("city");

function getCoords() {
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName.value + "&limit=3&appid=841bff87cafe164f0f5f33bd44701bfc";

    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                const lat = data[0].lat;
                console.log(lat);
                const lon = data[0].lon;
                console.log(lon);
                function getCurrentWeather() {
                    let requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=841bff87cafe164f0f5f33bd44701bfc&units=imperial";
                
                    fetch(requestUrl).then(function (response) {
                        if (response.ok) {
                            response.json().then(function (data) {
                                console.log(data);
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

/* function getWeather() {
    var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=841bff87cafe164f0f5f33bd44701bfc";

    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            })
        }
    })
}; */


function storeCity() {
    localStorage.setItem("storedCity", JSON.stringify(cityName));
};

function weatherSearch() {
    console.log(cityName);
    storeCity();
    getCoords();
    /* getWeather(); */
}

const storedCityName = JSON.parse(localStorage.getItem("storedCity"));

//new api request for when user clicks on history:

"http://api.openweathermap.org/geo/1.0/direct?q=" + storedCityName + "&limit=3&appid=841bff87cafe164f0f5f33bd44701bfc";
