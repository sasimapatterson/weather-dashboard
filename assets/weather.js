// var tableBody = document.getElementById('repo-table');
var searchButton = document.querySelector('search-button');
var appid = '95dbf8637213596a65605324d54153a0';
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
                // var tempEl = document.createElement('p');
                cityName.textContent = city.name;
                // tempEl.textContent = 'Temp ' + data.current.temp;
                weatherInfo.prepend(cityName);
                // document.body.appendChild(tempEl);
            });
    });
};

    var handleSearchSubmit = function (event) {
        event.preventDefault();
        var inputSpace = $(".search-input").val();
        if(!inputSpace){
            console.log('Please enter the name of the city!');
            return;
        }
        displayWeather(inputSpace);    
    };

    $(".search-button").on('click', handleSearchSubmit);

displayWeather('Atlanta');


