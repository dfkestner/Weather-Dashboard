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
                var uvURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + x + "&lon=" + y + "&appid=" + uvKey;

                $.ajax({
                    url: uvURL,
                    method: "GET"
                }).then(function(response) {
                    console.log(response);

                    var UV = $("<p>").text("UV Index: " + response.value)
                    $("#currentStats").append(UV)
                })
            }

            console.log(response);

            // +  "<h2 class='daily'>" + response.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl  + "'>" + "</h2>"

            $("#currentWeather").text((response.name) + ", " + (moment().format("MMMM Do, YYYY")))
            // var iconURL = "http://openweathermap.org/img/w" + response.weather[0].icon + ".png";

            var thisCity = response.name;
            var temp = $("<p>").text("Temperature: " + Math.ceil(response.main.temp) + "\xB0" + "F");
            var humid = $("<p>").text("Humidity: " + (response.main.humidity) + "%");
            var windSpeed = $("<p>").text("Wind Speed: " + Math.ceil(response.wind.speed) + " MPH");
            $("#currentStats").append(temp, humid, windSpeed);

            var recentCities = $("<li>").text(response.name);
            $(".list-group").append(recentCities);

            var lat = response.coord.lat;
            var lon = response.coord.lon;

            getUV(lat, lon)

            get5day(thisCity)
        });
        
        function get5day(forecast) {

            var thisKey = "6169fd357ae3eb07682f558919fa208b";
            var thisURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + forecast + "&units=imperial&appid=" + thisKey

            $.ajax({
                url: thisURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                
                $("#fiveDay").text("Five Day Forecast");
                var date1 = $("<p>").text(moment(response.list[0].dt_txt).format());
                $("#fiveDayStats").append(date1)
                var temp1 = $("<p>").text("Temperature: " + Math.ceil(response.list[0].main.temp) + "\xB0" + "F");
                $("#fiveDayStats").append(temp1);
                var humid1 = $("<p>").text("Humidity: " + (response.list[0].main.humidity) + "%");
                $("#fiveDayStats").append(humid1);
                // var icon1 = response.list[0].weather[0].icon;
                console.log(response.list[0].main.temp);
                console.log(response.list[0].main.humidity);
                console.log(moment(response.list[0].dt_txt).format());
                
                var date2 = $("<p>").text(moment(response.list[1].dt_txt).format('MMMM Do, YYYY'));
                $("#fiveDayStats").append(date2)
                var temp2 = $("<p>").text("Temperature: " + Math.ceil(response.list[1].main.temp) + "\xB0" + "F");
                $("#fiveDayStats").append(temp2);
                var humid2 = $("<p>").text("Humidity: " + (response.list[1].main.humidity) + "%");
                $("#fiveDayStats").append(humid2);
                console.log(response.list[1].main.temp);
                console.log(response.list[1].main.humidity);
                console.log(moment(response.list[1].dt_txt).format('MMMM Do, YYYY'))

                var date3 = $("<p>").text(moment(response.list[2].dt_txt).format('MMMM Do, YYYY'));
                $("#fiveDayStats").append(date3)
                var temp3 = $("<p>").text("Temperature: " + Math.ceil(response.list[2].main.temp) + "\xB0" + "F");
                $("#fiveDayStats").append(temp3);
                var humid3 = $("<p>").text("Humidity: " + (response.list[2].main.humidity) + "%");
                $("#fiveDayStats").append(humid3);
                console.log(response.list[2].main.temp);
                console.log(response.list[2].main.humidity);
                console.log(moment(response.list[2].dt_txt).format('MMMM Do, YYYY'))

                var date4 = $("<p>").text(moment(response.list[3].dt_txt).format('MMMM Do, YYYY'));
                $("#fiveDayStats").append(date4)
                var temp4 = $("<p>").text("Temperature: " + Math.ceil(response.list[3].main.temp) + "\xB0" + "F");
                $("#fiveDayStats").append(temp4);
                var humid4 = $("<p>").text("Humidity: " + (response.list[3].main.humidity) + "%");
                $("#fiveDayStats").append(humid4);
                console.log(response.list[3].main.temp);
                console.log(response.list[3].main.humidity);
                console.log(moment(response.list[3].dt_txt).format('MMMM Do, YYYY'))

                var date5 = $("<p>").text(moment(response.list[4].dt_txt).format('MMMM Do, YYYY'));
                $("#fiveDayStats").append(date5)
                var temp5 = $("<p>").text("Temperature: " + Math.ceil(response.list[4].main.temp) + "\xB0" + "F");
                $("#fiveDayStats").append(temp5);
                var humid5 = $("<p>").text("Humidity: " + (response.list[4].main.humidity) + "%");
                $("#fiveDayStats").append(humid5);
                console.log(response.list[4].main.temp);
                console.log(response.list[4].main.humidity);
                console.log(moment(response.list[4].dt_txt).format('MMMM Do, YYYY'))
            })
        }
    }
    
    $("#searchButton").on("click", function(event) {
        event.preventDefault();

        var cityName = $("#searchInput").val().trim();
    
        getWeather(cityName);
    });
});