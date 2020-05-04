// I need a search history to load with the page pulls up
// var to target recent searches element
var recentSearches = $("#recent-searches");
        if (localStorage.getItem("searchHistory")) {
            var searchHistory = localStorage.getItem("searchHistory").split(",");
            console.log(searchHistory);
            for (let i = 0; i < searchHistory.length; i++) {
                var newBtn = $("<button class='btn btn-link btn-lg active historyBtn'>").text(titleCase(searchHistory[i]));
                recentSearches.append(newBtn);
            }
            //   Search for last newly searched item by default
            getWeather(searchHistory[0]);
        } else {
            var searchHistory = [];
            //   Default search for kansas if no search history exists
            getWeather("Kansas City");
        }
        // user input if they use lower case return as upper case
        function titleCase(str) {
            return str.toLowerCase().replace(/(^|\s)\S/g, (L) => L.toUpperCase());
        }

// Getting today's date and future dates
const today = moment();
$("#today-date").text(moment().format("MM-DD-YYYY"));
$("#0day-date").text(moment().add(1, "days").format("MM-DD-YYYY"));
$("#1day-date").text(moment().add(2, "days").format("MM-DD-YYYY"));
$("#2day-date").text(moment().add(3, "days").format("MM-DD-YYYY"));
$("#3day-date").text(moment().add(4, "days").format("MM-DD-YYYY"));
$("#4day-date").text(moment().add(5, "days").format("MM-DD-YYYY"));

// ajax call from openweather 
// api key ebde16be45c988aa80db26446dd671a2

function getWeather(city) {
    var apiKey = "ebde16be45c988aa80db26446dd671a2";
    var queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;
    $.ajax({
        url: queryURL,
        method: "GET",
        error: function () {
            alert("Please type a valid city name")
        },
        success: function (response) {

             // input coordinates from first response to use in ajax 
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var queryURL =
                "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
            // I need variable to convert temp of Kelvin to Fahrenheit
            var temp = (response.main.temp - 273.15) * 1.8 + 32;
            $("#city").text(response.name);
            $("#temp").text("Temperature: " + temp.toFixed(0) + "F");
            $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
            $("#humidity").text("Humidity: " + response.main.humidity + "%");

              // I need to display my weather icon
            var iconcode = response.weather[0].icon;
            // var iconurl = "http://openweathermap.org/img/w/10d.png";
            $("#today-icon").attr("src", "http://openweathermap.org/img/w/" + iconcode + ".png");

            // ajax call to use the coordinates to from first call to get more info for city forcast....still building 
            $.ajax({
                url: queryURL,
                method: "GET",
            }).then(function (response) {
                // checking if the city searched is in the search history, if it is then new button is not needed
                if (searchHistory.indexOf(city) !== -1) {
                    // new searched city is added to array if the array hasn't have already 8 items
                } else if (searchHistory.length < 8) {
                    searchHistory.push(city);
                    //   var to create new button
                    var newBtn = $("<button class='btn btn-link btn-lg active historyBtn'>").text(titleCase(city));
                    recentSearches.append(newBtn);
                } else {
                    // if new searches occur while the array already has the 8 objects (cities) then new city replaces the first item in the search history array
                    // the button stays til refreshed
                    searchHistory.shift();
                    searchHistory.push(city);
                    //   creates new button for new city
                    var newBtn = $("<button class='btn btn-link btn-lg active historyBtn'>").text(titleCase(city));
                    recentSearches.append(newBtn);
                }
                localStorage.setItem("searchHistory", searchHistory);
                
                // pass the uv info to make strings into numbers
                var uvEl = parseFloat(response.current.uvi.toFixed(1));
                // setting the uv numbers to correspond to UV colors 
                // if statements used to check uv values 
                function checkUV() {
                    if (uvEl <= 2.9) {
                        $("#uv")
                            .css("color", "green")
                            .text("UV Index: " + uvEl);
                    } else if (uvEl < 5.9) {
                        $("#uv")
                            .css("color", "orange")
                            .text("UV Index: " + uvEl);
                    } else if (uvEl < 7.9) {
                        $("#uv")
                            .css("color", "orangered")
                            .text("UV Index: " + uvEl);
                    } else if (uvEl < 10) {
                        $("#uv")
                            .css("color", "red")
                            .text("UV Index: " + uvEl);
                    } else {
                        $("#uv")
                            .css("color", "purple")
                            .text("UV Index: " + uvEl);
                    }
                }
                checkUV(uvEl);

                // need to display temperature to the forcast
                $("#0day-temp").text(
                    "Temp: " +
                    ((response.daily[0].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                    "F"
                );
                $("#1day-temp").text(
                    "Temp: " +
                    ((response.daily[1].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                    "F"
                );
                $("#2day-temp").text(
                    "Temp: " +
                    ((response.daily[2].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                    "F"
                );
                $("#3day-temp").text(
                    "Temp: " +
                    ((response.daily[3].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                    "F"
                );
                $("#4day-temp").text(
                    "Temp: " +
                    ((response.daily[4].temp.day - 273.15) * 1.8 + 32).toFixed(1) +
                    "F"
                );
               
                // display my icons
                var iconCode = response.daily[0].weather[0].icon;
                $("#0day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

                var iconCode = response.daily[1].weather[0].icon;
                $("#1day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

                var iconCode = response.daily[2].weather[0].icon;
                $("#2day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

                var iconCode = response.daily[3].weather[0].icon;
                $("#3day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");

                var iconCode = response.daily[4].weather[0].icon;
                $("#4day-icon").attr("src", "http://openweathermap.org/img/w/" + iconCode + ".png");    
                
                //display my humidity
                $("#0day-humidity").text("Humidity: " + response.daily[0].humidity + "%");
                $("#1day-humidity").text("Humidity: " + response.daily[1].humidity + "%");
                $("#2day-humidity").text("Humidity: " + response.daily[2].humidity + "%");
                $("#3day-humidity").text("Humidity: " + response.daily[3].humidity + "%");
                $("#4day-humidity").text("Humidity: " + response.daily[4].humidity + "%");    
            });
        }
    })
}
