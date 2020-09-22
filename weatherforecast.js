function weatherForecast(cityName, countryCode) {
  var queryURL =
    "https://pro.openweathermap.org/data/2.5/forecast/climate?q=" +
    cityName +
    "," +
    countryCode +
    "&appid=8293cdf1f821bcf9f4e30739c53476af";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
  });
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    var pos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };

    console.log(pos);
  }),
    function () {
      console.log("This function is not supported");
    };
}
