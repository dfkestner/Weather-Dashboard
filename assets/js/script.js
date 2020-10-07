$(document).ready(function() {
    var addCity = JSON.parse(window.localStorage.getItem("thisCity")) || [];

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

                    var UV = response.daily[0].uvi
                    
                    if (UV <= 3) {
                        var uVal = $("<p>").text("UV Index: " + UV).addClass("low")
                        $("#uVText").append(uVal)
                    }
                    else if (3 < UV && UV <= 5) {
                        var uVal = $("<p>").text("UV Index: " + UV).addClass("mid")
                        $("#uVText").append(uVal)
                    }
                    else if (5 < UV && UV <= 8) {
                        var uVal = $("<p>").text("UV Index: " + UV).addClass("high")
                        $("#uVText").append(uVal)
                    }
                    else {
                        var uVal = $("<p>").text("UV Index: " + UV).addClass("burntout")
                        $("#uVText").append(uVal)
                    }

                    $("#fiveDay").text("Five Day Forecast");

                    $("#day1Stats").text(moment().add(1, "day").format('L'));
                    $("#day1").attr("src", "http://openweathermap.org/img/wn/" + response.daily[0].weather[0].icon + "@2x.png");
                    var temp1 = $("<p>").text("Temp: " + Math.ceil(response.daily[0].temp.day) + "\xB0" + "F");
                    var humid1 = $("<p>").text("Humidity: " + (response.daily[0].humidity) + "%");
                    $("#day1Stats").append(temp1, humid1);
                    
                    $("#day2Stats").text(moment().add(2, "day").format('L'));
                    $("#day2").attr("src", "http://openweathermap.org/img/wn/" + response.daily[1].weather[0].icon + "@2x.png");
                    var temp2 = $("<p>").text("Temp: " + Math.ceil(response.daily[1].temp.day) + "\xB0" + "F");
                    var humid2 = $("<p>").text("Humidity: " + (response.daily[1].humidity) + "%");
                    $("#day2Stats").append(temp2, humid2);

                    $("#day3Stats").text(moment().add(3, "day").format('L'));
                    $("#day3").attr("src", "http://openweathermap.org/img/wn/" + response.daily[2].weather[0].icon + "@2x.png");
                    var temp3 = $("<p>").text("Temp: " + Math.ceil(response.daily[2].temp.day) + "\xB0" + "F");
                    var humid3 = $("<p>").text("Humidity: " + (response.daily[2].humidity) + "%");
                    $("#day3Stats").append(temp3, humid3);

                    $("#day4Stats").text(moment().add(4, "day").format('L'));
                    $("#day4").attr("src", "http://openweathermap.org/img/wn/" + response.daily[3].weather[0].icon + "@2x.png");
                    var temp4 = $("<p>").text("Temp: " + Math.ceil(response.daily[3].temp.day) + "\xB0" + "F");
                    var humid4 = $("<p>").text("Humidity: " + (response.daily[3].humidity) + "%");
                    $("#day4Stats").append(temp4, humid4);

                    $("#day5Stats").text(moment().add(5, "day").format('L')).addClass("col");
                    $("#day5").attr("src", "http://openweathermap.org/img/wn/" + response.daily[4].weather[0].icon + "@2x.png");
                    var temp5 = $("<p>").text("Temp: " + Math.ceil(response.daily[4].temp.day) + "\xB0" + "F");
                    var humid5 = $("<p>").text("Humidity: " + (response.daily[4].humidity) + "%");
                    $("#day5Stats").append(temp5, humid5);
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

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            getUV(lat, lon);

            addCity.push(thisCity);

            window.localStorage.setItem("thisCity", JSON.stringify(addCity));
            
            getCityButtons();
        }); 
    }

    $("#searchButton").on("click", function(event) {
        event.preventDefault();
        $("#currentStats").empty();
        $("#uVText").empty();

        var cityName = $("#searchInput").val().trim();
    
        getWeather(cityName);

        $("#searchInput").val("");
    });

    $(window).on("load", function() {
        $("#currentStats").empty();
        if(addCity != "") {
            getWeather(addCity.slice(-1)[0]);
        }

        // getCityButtons();
    });

    function getCityButtons() {
        for (i = 0; i < addCity.length; i++) {
            var addCityButton = addCity[i];
            var cityButton = $("<button>").text(addCityButton).addClass("ctbn btn btn-secondary").attr("data-index", i);
        }    
            $("#recent").append(cityButton);
    }
})