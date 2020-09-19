//New York Times Newsfeed 

//Adds two articles from NYT Arts Section 
var queryURL = "https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    for (i=0; i<2; i++){
        
        createDiv(response.results[i].title);
        
        createDiv(response.results[i].abstract);

        createDiv(response.results[i].url);
    }

    
});

function createDiv (contents){

    $("#article-section").append(`<div>${contents}</div>`);
}

//Adds two articles from NYT science section 
var queryURL = "https://api.nytimes.com/svc/topstories/v2/science.json?api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    for (i=0; i<2; i++){
        
        createDiv(response.results[i].title);
        
        createDiv(response.results[i].abstract);

        createDiv(response.results[i].url);
    }

    
});

function createDiv (contents){

    $("#article-section").append(`<div>${contents}</div>`);
}


//Adds two articles from NYT world news section 
var queryURL = "https://api.nytimes.com/svc/topstories/v2/world.json?api-key=R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M"

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response){
    for (i=0; i<2; i++){
        
        createDiv(response.results[i].title);
        
        createDiv(response.results[i].abstract);

        createDiv(response.results[i].url);
    }

    
});

function createDiv (contents){

    $("#article-section").append(`<div>${contents}</div>`);
}
