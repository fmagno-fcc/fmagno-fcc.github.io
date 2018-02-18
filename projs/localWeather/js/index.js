p = console.log

var weatherIconMap = {
    "clear sky": "wi wi-day-sunny",
    "few clouds": "wi wi-day-cloudy",
    "scattered clouds": "wi wi-cloud",
    "broken clouds": "wi wi-cloudy",
    "shower rain": "wi wi-showers",
    "rain": "wi wi-rain",
    "thunderstorm": "wi wi-thunderstorm",
    "snow": "wi wi-snow",
    "mist": "wi wi-fog",
}

var tempUnits = "C"
var temperature = "?"

$(document).ready(() => {
    // Swap current temperature units
    $("#unitsButton").on("click", () => {
        if (tempUnits == "C"){
            tempUnits = "F";
        }else{
            tempUnits = "C";
        }

        showTemperature();
    })

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successFunction, () => { });
    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    }
});

function successFunction(position) {
    p("Latitude:", position.coords.latitude);
    p("Longitude:", position.coords.longitude);

    var weatherUrl = "https://fcc-weather-api.glitch.me/api/current?" + "lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;
    p("Weather URL:", weatherUrl);
    // fetch(weatherUrl).then(
    //     (data) => {
    //         p("weather data:", data)
    //     }
    // )
    $.getJSON(weatherUrl, (data) => {
        p(data);
        p(data.sys.country);
        // p(data.weather[0].main);
        p(data.weather[0].description);
        p(data.main["temp"]);


        var town = data.name;
        var country = data.sys.country;
        // var weather = data.weather[0].main
        var weather = data.weather[0].description;
        temperature = data.main["temp"];

        $("#weatherIcon").attr("class", weatherIconMap[weather]);
        showTemperature();

        // Show location
        $("#location").html(town + ", " + country);

    });
}

function showTemperature (){
    p("showing temperature!");
    if (tempUnits == "C") {
        $("#temperature").html(temperature.toString() + " °C")
    } else {
        var temp = temperature * 1.8 + 32;
        $("#temperature").html(temp.toString() + " °F")
    }
}
