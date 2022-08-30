var searchButton = document.querySelector('search-button');
var appid = '95dbf8637213596a65605324d54153a0';
var weatherArea = document.querySelector('.weather-area');
var weatherInfo = document.querySelector('.weather-info');
var today = document.querySelector('.current-date');
var futureDate = document.querySelector('.future-date');
var searchInput = document.querySelector('.search-input');
var searchHistory = document.querySelector('.city-search')
var btn = document.createElement("button");
var fiveDays = document.querySelector('.five-days');
var temp = document.querySelector('.temp');
var wind = document.querySelector('.wind');
var humidity = document.querySelector('.humidity');
// var clearBtn = document.querySelector('.clear-btn');
var searched = [];

// current date using moment.js
today.textContent = moment().format('MM-DD-YYYY');


// fetch request to get cities from OpenWeather API
function displayWeather(newCity) {
    var q = newCity;
    var requestUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;
    fetch(requestUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (locations) {
            console.log(locations);
            var city = locations[0];


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
                    fiveDaysForecast(data);

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

}       

// to display 5-days forecast
var fiveDaysForecast = function(data){
    console.log(data);
    for(var i = 0; i < data.daily.length; i++) { 
    console.log(data.daily[i]);
    if(i == 1) {
      
        futureDate.textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString(); 
        temp.innerHTML = `Temp: ${data.daily[i].temp.day} °F`; 
        wind.innerHTML = `Wind: ${data.daily.weather.wind_speed} MPH`; 
        humidity.innerHTML = `Humidity: ${data.daily.humidity} °F`; 
    }

    }
};

// fiveDaysForecast();
   
var displaySearch = function () {
    // create buttons to store previous search
    searchHistory.innerHTML = '';
    for (var i = 0; i < searched.length; i++) {
        var btn = document.createElement("button");
        btn.style.backgroundColor = 'gray';
        btn.textContent = searched[i];
        searchHistory.appendChild(btn);
        // clearBtn.appendChild(btn)
    };

}


var handleSearchSubmit = function (event) {
    event.preventDefault();
    var inputSpace = $(".search-input").val(); //var inputSpace = document.querySelector('.search-input').value;
    if (!inputSpace) {
        console.log('Please enter the name of the city.');
        return;
    }
    searched.push(inputSpace);
    localStorage.setItem('searchHistory', JSON.stringify(searched));


    displayWeather(inputSpace);
    // clearBtn.empty();
    displaySearch();
    // searchInput.value = '';
};

// fiveDaysForecast();

$(".search-button").on('click', handleSearchSubmit);


// displaySearch();
// displayWeather();
// weatherEl();
// data.daily.forEach((day, idx) =>
// futureDate.textContent = moment(data.daily.dt*1000).format('MM-DD-YYYY'); 