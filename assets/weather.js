// var tableBody = document.getElementById('repo-table');
var searchButton = document.querySelector('search-button');
var appid = '95dbf8637213596a65605324d54153a0';
var weatherArea = document.querySelector('.weather-area');
var weatherInfo = document.querySelector('.weather-info');
var today = document.querySelector('.current-date');
var searchInput = document.querySelector('.search-input');
var searchHistory = document.querySelector('.city-search')
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
            // var forecast = locations[1];
            // console.log('Name', city.name);
            // console.log('State', city.state);
            // console.log('Forcase', forecast.daily);

            var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

            // `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${appid}&units=imperial&exclude=hourly,minutely`;

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

                    // var { temp, wind_speed, humidity, uvi } = data.current;

                    // weatherInfo.innerHTML =
                    //     `<div class="weather-area">
                    //         <h2></h2>
                    //         <ul class="weather-info">
                    //             <li class="temp">Temp: <span>${temp}</li>
                    //             <li class="wind">Wind: <span>${wind_speed}</li>
                    //             <li class="humid">Humidity: <span>${humidity}</li>
                    //             <li class="uv">UV: <span>${uvi}</li>
                    //         </ul>
                    //     </div>`;


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

var displaySearch = function () {
    // create buttons to store previous search
    searchHistory.innerHTML = '';
    for (var i = 0; i < searched.length; i++) {
        var btn = document.createElement("button");
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
    searchInput.value = '';

};



$(".search-button").on('click', handleSearchSubmit);


// displaySearch();
// displayWeather();
// weatherEl();
