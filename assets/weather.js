// var tableBody = document.getElementById('repo-table');
var searchButton = document.querySelector('search-button');
var appid = '95dbf8637213596a65605324d54153a0';
var weatherArea = document.querySelector('.weather-area');
var weatherInfo = document.querySelector('.weather-info');
var today = document.querySelector('.current-date');
var searchInput = document.querySelector('.search-input');
var searchHistory = document.querySelector('.city-search')

// current date using moment.js
today.textContent = moment().format('MM-DD-YYYY');


// fetch request to get cities from OpenWeather API
function displayWeather(newCity) {
    var q = newCity;
    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (locations) {
            console.log(locations);
            var city = locations[0];
            // var forecast = locations[1];
            // console.log('Name', city.name);
            // console.log('State', city.state);
            // console.log('Forcase', forecast.daily);

            var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

            // fetch from oneCall to get weather
            fetch(oneCall)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    var cityName = document.createElement('h2');
                    cityName.textContent = city.name;
                    weatherArea.prepend(cityName);
                    weatherEl(data);

                    // create objects to store in the local storage
                    var weatherDetails = {
                        city: city.name,
                        temp: data.current.temp,
                        wind: data.current.wind_speed,
                        humidity: data.current.humidity,
                        uv: data.current.uvi
                    };
                    // store in local storage
                    var weatherData = JSON.stringify(weatherDetails);
                    console.log(weatherData.toString());
                    localStorage.setItem("weatherDetails", weatherData);
                    var storedWeather = localStorage.getItem('weatherDetails');
                    console.log(storedWeather);
                    // localStorage.setItem('city', city.name);
                    // var storedCity = localStorage.getItem('city');
                    // console.log(storedCity);
                    var btn = document.createElement("button");
                    btn.innerHTML = city.name;
                    btn.onclick = function () {
                        weatherEl();
                    };
                    searchHistory.appendChild(btn);
                });
        });
};


// for all the weather elements of the searched city which will display on the page
var weatherEl = function (data) {
    var tempEl = document.createElement('li');
    var windEl = document.createElement('li');
    var humidEl = document.createElement('li');
    var uvEl = document.createElement('li');
    tempEl.textContent = 'Temp: ' + data.current.temp + ' °F';
    windEl.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
    humidEl.textContent = 'Humidity: ' + data.current.humidity + ' %';
    uvEl.textContent = 'UV index: ' + data.current.uvi;

    weatherInfo.appendChild(tempEl);
    weatherInfo.appendChild(windEl);
    weatherInfo.appendChild(humidEl);
    weatherInfo.appendChild(uvEl);
};

var handleSearchSubmit = function (event) {
    event.preventDefault();
    var inputSpace = $(".search-input").val(); //var inputSpace = document.querySelector('.search-input').value;
    if (!inputSpace) {
        console.log('Please enter the name of the city.');
        return;
    }
    displayWeather(inputSpace);
};

$(".search-button").on('click', handleSearchSubmit);

// displayWeather();
// weatherEl();

