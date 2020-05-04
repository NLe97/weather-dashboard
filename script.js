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

            //   second ajax call (using coordinates) using data above to get a more detailed future forecast and UV index
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
                


               

