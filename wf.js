var savedLocations = [];
var currentLocation;
function initialize() {
    //display prior cities from local storage
    savedLocations = JSON.parse(localStorage.getItem("cities"));
    
    if (savedLocations) {
        
        currentLocation = savedLocations[savedLocations.length - 1];
        showPrevious();
        getCurrent(currentLocation);
    }
    else {
        // ask to enable location services - default to nyc if denied
        if (!navigator.geolocation) {
            
            getCurrent("New york");
        }
        else {
            navigator.geolocation.getCurrentPosition(success, error);
        }
    }
}
function success(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&APPID=846c51800489cd6a062d23f85a4d24c8";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        currentLocation = response.name;
        saveLocation(response.name);
        getCurrent(currentLocation);
    });
}
function error(){
    // default to nyc
    currentLocation= "New york"
    getCurrent(currentLocation);
}
function showPrevious() {
    // display prior local storage results
    if (savedLocations) {
        $("#previousSearches").empty();
        var Btns = $("<div>").attr("class", "list-group");
        for (var i = 0; i < savedLocations.length; i++) {
            var localBtn = $("<a>").attr("href", "#").attr("id", "local-btn").text(savedLocations[i]);
            if (savedLocations[i] == currentLocation) {
                localBtn.attr("class", "list-group-item list-group-item-action active");
            }
            else {
                localBtn.attr("class", "list-group-item list-group-item-action");
            }
            Btns.prepend(localBtn);
        }
        $("#previousSearches").append(Btns);
    }
}
function getCurrent(city) {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=846c51800489cd6a062d23f85a4d24c8";
    $.ajax({
        url: queryURL,
        method: "GET",
        error: function () {
            savedLocations.splice(savedLocations.indexOf(city), 1);
            localStorage.setItem("cities", JSON.stringify(savedLocations));
            initialize();
        }
    }).then(function (response) {
        // cards
        var currentCard = $("<div>").attr("class", "card bg-light");
        $("#forecast").append(currentCard);
        // card for current weather
        var currentCardHead = $("<div>").attr("class", "card-header").text("Current weather for " + response.name);
        currentCard.append(currentCardHead);
        var cardRow = $("<div>").attr("class", "row no-gutters");
        currentCard.append(cardRow);
        // weather icons
        var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        var imgDiv = $("<div>").attr("class", "col-md-4").append($("<img>").attr("src", iconURL).attr("class", "card-img"));
        cardRow.append(imgDiv);
        var textDiv = $("<div>").attr("class", "col-md-8");
        var cardBody = $("<div>").attr("class", "card-body");
        textDiv.append(cardBody);
        // last searched city name
        cardBody.append($("<h3>").attr("class", "card-title").text(response.name));
        // last update date & time
        var currentDate = moment(response.dt, "X").format("dddd, MMMM Do YYYY, h:mm a");
        cardBody.append($("<p>").attr("class", "card-text").append($("<small>").attr("class", "text-muted").text("Last updated: " + currentDate)));
        // equation from kelvin to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;
        // local temperature at searched city 
        cardBody.append($("<p>").attr("class", "card-text").html("Temperature: " + tempF.toFixed(2) + " &#8457;"));
        // local humidity at searched city
        cardBody.append($("<p>").attr("class", "card-text").text("Humidity: " + response.main.humidity + "%"));
        // wind speed ''
        cardBody.append($("<p>").attr("class", "card-text").text("Wind Speed: " + response.wind.speed + " MPH"));
        // uv index ''
        var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=7e4c7478cc7ee1e11440bf55a8358ec3&lat=" + response.coord.lat + "&lon=" + response.coord.lat;
        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (uvresponse) {
            var uvindex = uvresponse.value;
            var bgcolor;
            if (uvindex <= 3) {
                bgcolor = "green";
            }
            else if (uvindex >= 3 || uvindex <= 6) {
                bgcolor = "yellow";
            }
            else if (uvindex >= 6 || uvindex <= 8) {
                bgcolor = "orange";
            }
            else {
                bgcolor = "red";
            }
            var uvCheck = $("<p>").attr("class", "card-text").text("UV Index: ");
            uvCheck.append($("<span>").attr("class", "uvindex").attr("style", ("background-color:" + bgcolor)).text(uvindex));
            cardBody.append(uvCheck);
        });
        cardRow.append(textDiv);
        getForecast(response.id);
    });
}
function getForecast(city) {
    // 5 day forecast
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&APPID=846c51800489cd6a062d23f85a4d24c8";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        //card for 5 day forecast
        var addRow = $("<div>").attr("class", "forecast");
        $("#forecast").append(addRow);
        // for loop / array at set time for forecast
        for (var i = 0; i < response.list.length; i++) {
            if (response.list[i].dt_txt.indexOf("15:00:00") !== -1) {
                var addCol = $("<div>").attr("class", "one-fifth");
                addRow.append(addCol);
                var addCard = $("<div>").attr("class", "card text-white bg-primary");
                addCol.append(addCard);
                var cardHead = $("<div>").attr("class", "card-header").text(moment(response.list[i].dt, "X").format("MMM Do"));
                addCard.append(cardHead);
                var cardImg = $("<img>").attr("class", "card-img-top").attr("src", "https://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                addCard.append(cardImg);
                var bodyDiv = $("<div>").attr("class", "card-body");
                addCard.append(bodyDiv);
                // equation from kelvin to fahrenheit
                var tempF5 = (response.list[i].main.temp - 273.15) * 1.80 + 32;
                bodyDiv.append($("<p>").attr("class", "card-text").html("Temp: " + tempF5.toFixed(2) + " &#8457;"));
                bodyDiv.append($("<p>").attr("class", "card-text").text("Humidity: " + response.list[i].main.humidity + "%"));
            }
        }
    });
}
function clear() {
    //clear weather history ?
    $("#forecast").empty();
}
function saveLocation(location){
    // array of saved locations
    if (savedLocations === null) {
        savedLocations = [location];
    }
    else if (savedLocations.indexOf(location) === -1) {
        savedLocations.push(location);
    }
    // array to local storage
    localStorage.setItem("cities", JSON.stringify(savedLocations));
    showPrevious();
}
$("#searchBtn").on("click", function () {
    
    event.preventDefault();
    //grab the value
    var location = $("#searchInput").val().trim();
    // location ?
    if (location !== "") {
        // clear display city
        clear();
        currentLocation = location;
        saveLocation(location);
        // clear the search ?
        $("#searchInput").val("");
        //current city
        getCurrent(location);
    }
});
$(document).on("click", "#local-btn", function () {
    clear();
    currentLocation = $(this).text();
    showPrevious();
    getCurrent(currentLocation);
});
initialize();