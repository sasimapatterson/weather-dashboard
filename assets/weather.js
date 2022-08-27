// var tableBody = document.getElementById('repo-table');
var fetchButton = document.getElementById('fetch-button');
var appid = '95dbf8637213596a65605324d54153a0';
var q = 'Charlotte';
var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${q}&appid=${appid}`;

// function getApi() {
// fetch request gets a list of cities from OpenWeather API

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
                // var h2El = document.createElement('h2');
                // var tempEl = document.createElement('p');
                // h2El.textContent = city.name;
                // tempEl.textContent = 'Temp ' + data.current.temp;
                // document.body.appendChild(h2El);
                // document.body.appendChild(tempEl);
            });
    });

// fetchButton.addEventListener('click', getApi);


