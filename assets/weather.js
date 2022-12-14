var searchButton = document.querySelector('search-button');
var appid = '95dbf8637213596a65605324d54153a0';
var weatherArea = document.querySelector('.weather-area');
var weatherInfo = document.querySelector('.weather-info');
var today = document.querySelector('.current-date');
var futureDate = document.querySelectorAll('.future-date');
var searchInput = document.querySelector('.search-input');
var searchHistory = document.querySelector('.city-search')
var btn = document.createElement("button");
var fiveDays = document.querySelector('.five-days');
var temp = document.querySelectorAll('.temp');
var wind = document.querySelectorAll('.wind');
var humidity = document.querySelectorAll('.humidity');
var tempEl = document.querySelector('.temp-el');
var windEl = document.querySelector('.wind-el');
var humidEl = document.querySelector('.humid-el');
var uvEl = document.querySelector('.uv-el');
var cityName = document.querySelector('.city-name');


// current date using moment.js
today.textContent = moment().format('MM-DD-YYYY');


// fetch request to get cities from OpenWeather API
function displayWeather(newCity) {
    var q = newCity;
    // OpenWeather API for Geo 
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (locations) {
            console.log(locations);
            var city = locations[0];

            // OpenWeather API for weather data
            var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;


            // fetch from oneCall to get weather
            fetch(oneCall)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    cityName.innerHTML = city.name;
                   
                    weatherEl(data);
                    fiveDaysForecast(data);

                });
        });
};

// for all the weather elements of the searched city which will display on the page
var weatherEl = function (data) {

    tempEl.innerHTML = 'Temp: ' + data.current.temp + ' ??F';
    windEl.innerHTML = 'Wind: ' + data.current.wind_speed + ' MPH';
    humidEl.innerHTML = 'Humidity: ' + data.current.humidity + ' %';
    uvEl.innerHTML = 'UV index: ' + data.current.uvi;

}

// to display 5-days forecast
var fiveDaysForecast = function (data) {
    // console.log(data); 
    for (var i = 0; i < 5; i++) {
        console.log(data.daily[i]);

        futureDate[i].textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString();
        temp[i].innerHTML = `Temp: ${data.daily[i].temp.day} ??F`;
        wind[i].innerHTML = `Wind: ${data.daily[i].wind_speed} MPH`;
        humidity[i].innerHTML = `Humidity: ${data.daily[i].humidity} ??F`;   

    }
};

var displaySearch = function () {
    // create buttons to store previous search
    var searched = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searchHistory.innerHTML = '';
    for (var i = 0; i < searched.length; i++) {
        var btn = document.createElement("button");
        btn.style.backgroundColor = 'gray';
        btn.style.color = 'white';
        btn.textContent = searched[i];
        searchHistory.appendChild(btn);
        
    };

}

var handleSearchSubmit = function (event) {
    event.preventDefault();
    var inputSpace = document.querySelector('.search-input').value;
    if (!inputSpace) {
        console.log('Please enter the name of the city.');
        return;
    }
    var searched = JSON.parse(localStorage.getItem("searchHistory")) || [];
    searched.push(inputSpace);
    localStorage.setItem('searchHistory', JSON.stringify(searched));


    displayWeather(inputSpace);
    
    displaySearch();
   
};

var handleCityClick = function (event){
    event.preventDefault();
    if(event.target.matches("button")){
        displayWeather(event.target.textContent);
    
        displaySearch();
    }
}


document.querySelector(".search-button").addEventListener('click', handleSearchSubmit);
document.querySelector(".city-search").addEventListener('click', handleCityClick);

displaySearch();

