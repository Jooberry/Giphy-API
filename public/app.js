var app = function() {
  var url = 'http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC';
  bindEvents();
  makeRequest("GET", url, requestComplete);
}

var bindEvents = function(){
  var searchQuery = document.getElementById("search-query");
  var gifsDiv = document.getElementById("gifs");

  searchQuery.addEventListener("keyup", function(){
    gifsDiv.innerHTML = "";
    var url = "http://api.giphy.com/v1/gifs/search?q=" + this.value + "&api_key=dc6zaTOxFJmzC";
    makeRequest("GET", url, requestComplete);
  });
}

var reset = function(){
  var resetButton = document.getElementsByName("reset");

  resetButton.addEventListener("click", function(){
    gifsDiv.innerHTML = "";
  })
}

var makeRequest = function(method, url, callback){
  var request = new XMLHttpRequest();
  request.open(method, url);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var data = JSON.parse(jsonString);
  display(data);
}

var display = function(data){
  console.log(data);
  var gifData = document.getElementById("gifs");

  data.data.forEach(function(gif){
    var div = document.createElement("div");
    div.className = "gif";
    div.innerHTML = "<img src='" + gif.images.fixed_height_downsampled.url + "'>"
    gifData.appendChild(div);
  });
}

window.addEventListener("load", app);