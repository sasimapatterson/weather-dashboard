// var tableBody = document.getElementById('repo-table');
var searchButton = document.querySelector('search-button');
var appid = '95dbf8637213596a65605324d54153a0';
var weatherArea = document.querySelector('.weather-area');
var weatherInfo = document.querySelector('.weather-info');
var today = document.querySelector('.current-date');
var searchInput = document.querySelector('.search-input');
// today.textContext = moment().format('MM/DD/YYYY');

// var cityChoices = ['Austin', 'Chicago', 'New York', 'Orlando', 'San Fran', 'Seattle', 'Denver', 'Atlanta'];


// function getApi() {
// fetch request gets a list of cities from OpenWeather API
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
            console.log('Name', city.name);
            console.log('State', city.state);
            

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

                });
        });
};

// 
var weatherEl = function (data) {
    
    var tempEl = document.createElement('li');
    var windEl = document.createElement('li');
    var humidEl = document.createElement('li');
    var uvEl = document.createElement('li');
    tempEl.textContent = 'Temp: ' + data.current.temp;
    windEl.textContent = 'Wind: ' + data.current.wind_speed;
    humidEl.textContent = 'Humidity: ' + data.current.humidity;
    uvEl.textContent = 'UV index: ' + data.current.uvi;

    // cityName.textContent = data.name;

   
    weatherInfo.appendChild(tempEl);
    weatherInfo.appendChild(windEl);
    weatherInfo.appendChild(humidEl);
    weatherInfo.appendChild(uvEl);
}


var handleSearchSubmit = function (event) {
    event.preventDefault();
    var inputSpace = $(".search-input").val();
    if (!inputSpace) {
        console.log('Please enter the name of the city.');
        return;
    }
    displayWeather(inputSpace);
};

$(".search-button").on('click', handleSearchSubmit);

// displayWeather();
// weatherEl();

