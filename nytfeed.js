//New York Times Newsfeed

//Adds two articles from NYT Arts Section
var queryURL =
  "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  for (i = 0; i < 1; i++) {
    createDiv(response.results[i].title, response.results[i].abstract, response.results[i].url);
  }
});

function createDiv(title, abstract, url) {
  $("#article-section").append(`<div class="border" style-padding="20px">
  <h3>${title}</h3>
  <p>${abstract}</p>
  <a href=${url}>Article Link</a>
  </div>`);
}

//Adds two articles from NYT science section
var queryURL =
  "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M";

$.ajax({
  url: queryURL,
  method: "GET",
}).then(function (response) {
  for (i = 0; i < 1; i++) {
    createDiv(response.results[i].title, response.results[i].abstract, response.results[i].url);
    console.log(response.results[i])
  }
});