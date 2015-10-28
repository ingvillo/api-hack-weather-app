$(document).ready(function () {

//----------------------------------------------Get ip--------------------------------------------------------------

  $(function() {
    $.getJSON("https://api.ipify.org?format=jsonp&callback=?",
      function(json) {
        var searchTerm = json.ip;
        //console.log (searchTerm);
        getRequest(searchTerm);
      }
    );
  });



//----------------------------------------------show Result--------------------------------------------------------------
  function showResults (data){
    var items= data.items;
    var tempC = data.data.current_condition[0].temp_C;
    var desc = data.data.current_condition[0].weatherDesc[0].value;
    var city = data.data.nearest_area[0].areaName[0].value;
    var country = data.data.nearest_area[0].country[0].value;
    var iconurl = data.data.current_condition[0].weatherIconUrl[0].value;

    //var country = JSON.stringify(data.data.nearest_area[0].country[0].value);
    //console.log(JSON.stringify(data.data.nearest_area[0].country[0].value));

    var dynamicPopulatedResult = '<div><p id="areaName">'+ city + ', ' + country + '</p></div><img id="weatherIcon" src="'+iconurl+'" alt="weather-icon"><p>'+desc+'</p><h2 id="tempC" class="tempC">'+tempC+'°C </h2>';

    $('#output').append(dynamicPopulatedResult); 
    setBackgroundCol(tempC); 
    
  }


//-----------------------------------------get request--------------------------------------------------------------- 
  function getRequest(searchTerm){
    var params = {
      q:searchTerm,
      format:'json',
      num_of_days:'1',
      fx: 'no',
      includelocation: 'yes',
      key:'02615db800225a5b5ccfc3a61e8be'
    },
  url='http://api.worldweatheronline.com/free/v2/weather.ashx';
  $.getJSON(url,params,function (data) {
    showResults(data);
          
  });
}

//----------------------------------------------Set background color--------------------------------------------------------------

function setBackgroundCol(tempC) {

    if (tempC <= -10) {
      document.body.style.backgroundColor = "#6666CC"; //purple
    } else if (tempC <= 10) {
      document.body.style.backgroundColor = "#2BA3FF"; //blue
    } else if (tempC <= 20){
      document.body.style.backgroundColor = "#66CC33"; //green
    } else if (tempC <= 30) {
      document.body.style.backgroundColor = "#F9C80E"; //yellow
    } else if (tempC <= 40) {
      document.body.style.backgroundColor = "#F18F01"; //orange
    } else if (tempC <= 60) {
      document.body.style.backgroundColor = "#FF0000"; //red
    } else {
      document.body.style.backgroundColor = "#394648"; //black
    }

  }

});
