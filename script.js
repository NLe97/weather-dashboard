// get current day 
const today = moment();
// console.log(moment().format("MM-DD-YYYY"));
$("#today-date").text(moment().format("MM-DD-YYYY"));
$("#0day-date").text(moment().add(1, "days").format("MM-DD-YYYY"));
$("#1day-date").text(moment().add(2, "days").format("MM-DD-YYYY"));
$("#2day-date").text(moment().add(3, "days").format("MM-DD-YYYY"));
$("#3day-date").text(moment().add(4, "days").format("MM-DD-YYYY"));
$("#4day-date").text(moment().add(5, "days").format("MM-DD-YYYY"));

// ajax call from openweather 
// api key ebde16be45c988aa80db26446dd671a2

function getWeather (city) {
    var apiKey = "ebde16be45c988aa80db26446dd671a2";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "$appid=" + apiKey;

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
            var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon +"&appid=" + apiKey;

            // I need variable to convert temp of Kelvin to Fahrenheit



        }
        
    })




}