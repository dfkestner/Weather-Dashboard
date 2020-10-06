$(document).ready(function() {

    function getWeather(cityName) {
        
        var apiKey = "6169fd357ae3eb07682f558919fa208b";
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET" 
        }).then(function(response) {

            function getUV(x, y) {

                var uvKey = "6169fd357ae3eb07682f558919fa208b";
                var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + x + "&lon=" + y + "&exclude=minutely,hourly&units=imperial&appid=" + uvKey;

                $.ajax({
                    url: uvURL,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);

                    var UV = $("<p>").text("UV Index: " + response.daily[0].uvi)
                    $("#currentStats").append(UV)

                    $("#fiveDay").text("Five Day Forecast");

                    $("#day1").text(moment().add(1, "day").format('L'));
                    $("#icon1").attr("src", "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png");
                    var temp1 = $("<p>").text("Temp: " + Math.ceil(response.daily[0].temp.day) + "\xB0" + "F");
                    var humid1 = $("<p>").text("Humidity: " + (response.daily[0].humidity) + "%");
                    $("#day1").append(temp1, humid1);
                    
                    $("#day2").text(moment().add(2, "day").format('L'));
                    $("#icon2").attr("src", "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png");
                    var temp2 = $("<p>").text("Temp: " + Math.ceil(response.daily[1].temp.day) + "\xB0" + "F");
                    var humid2 = $("<p>").text("Humidity: " + (response.daily[1].humidity) + "%");
                    $("#day2").append(temp2, humid2);

                    $("#day3").text(moment().add(3, "day").format('L'));
                    $("#icon3").attr("src", "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png");
                    var temp3 = $("<p>").text("Temp: " + Math.ceil(response.daily[2].temp.day) + "\xB0" + "F");
                    var humid3 = $("<p>").text("Humidity: " + (response.daily[2].humidity) + "%");
                    $("#day3").append(temp3, humid3);

                    $("#day4").text(moment().add(4, "day").format('L'));
                    $("#icon4").attr("src", "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png");
                    var temp4 = $("<p>").text("Temp: " + Math.ceil(response.daily[3].temp.day) + "\xB0" + "F");
                    var humid4 = $("<p>").text("Humidity: " + (response.daily[3].humidity) + "%");
                    $("#day4").append(temp4, humid4);

                    $("#day5").text(moment().add(5, "day").format('L')).addClass("col");
                    $("#icon5").attr("src", "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png");
                    var temp5 = $("<p>").text("Temp: " + Math.ceil(response.daily[4].temp.day) + "\xB0" + "F");
                    var humid5 = $("<p>").text("Humidity: " + (response.daily[4].humidity) + "%");
                    $("#day5").append(temp5, humid5);
                })
            }

            console.log(response);

            $("#currentWeather").text(response.name + ", " + moment().format("MMMM Do, YYYY"));
            $("#icon").attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png");

            var thisCity = response.name;
            var temp = $("<p>").text("Temperature: " + Math.ceil(response.main.temp) + "\xB0" + "F");
            var humid = $("<p>").text("Humidity: " + (response.main.humidity) + "%");
            var windSpeed = $("<p>").text("Wind Speed: " + Math.ceil(response.wind.speed) + " MPH");
            $("#currentStats").append(temp, humid, windSpeed);

            var recentCities = $("<button>").text(thisCity).addClass("btn btn-outline-secondary").val(thisCity);
            $(".list-group").append(recentCities);

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            getUV(lat, lon)

            var cityList = JSON.parse(localStorage.getItem("addCity")) || [];

            var addCity = response.name;

            if([cityList].indexOf(addCity) == -1) {
                [cityList].push(addCity)
                window.localStorage.setItem("addCity", JSON.stringify(addCity));
            }
        }); 
    }

    $("#searchButton").on("click", function(event) {
        event.preventDefault();

        var cityName = $("#searchInput").val().trim();
    
        getWeather(cityName);
    });
});