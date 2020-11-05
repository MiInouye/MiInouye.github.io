//helper functions
var dayOfWeek = "";
function formatDate(date, month, year)
{
  month = (month.length < 2) ? ('0' + month) : month;
  date = (date.length < 2)? ('0' + date) : date;
  return [year,month,date].join('-');
}
function getDayofWeek(date, month, year){
  var week_names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayOfWeek =  week_names[new Date([month,date,year].join('-')).getDay()];
  return dayOfWeek;
}
function getFarenheitTemp(temp){
  return (9*temp/5)+32;
}


// var long = document.getElementById("long").value;
// console.log(long);
// var lat = document.getElementById("lat").value;
// console.log(lat);

// var url ="https://api.weatherstack.com/forecast?access_key=5bc82451636190abd9d7afe6fe9b20b5&query=" + lat + "," + long + "&forecast_days=6";
//run when the document object model is ready for javascript code to execute
$(document).ready(function() {
   //Place your weatherstack API Call Here - access_key to be used: 5bc82451636190abd9d7afe6fe9b20b5
   var long = document.querySelector('#long').value;
   console.log(long);
   var lat = document.querySelector('#lat').value;
   console.log(lat);
   
   var url ="https://api.weatherstack.com/forecast?access_key=5bc82451636190abd9d7afe6fe9b20b5&query=" + lat + "," + long + "&forecast_days=6";
  
   console.log(url);
  
    $.ajax({url:url, dataType:"jsonp"}).then(function(data) {
      //helper function - to be used to get the key for each of the 5 days in the future when creating cards for forecasting weather
      //console.log(data);

      var image_today = data.current.weather_icons;
      var local_time = data.location.localtime;
      var location = data.location.name;
      var temp_today = getFarenheitTemp(data.current.temperature);   
      var precip_today = data.current.precip;  
      var humidity_today = data.current.humidity;   
      var wind_today = data.current.wind_speed;
      var summary_today = data.current.weather_descriptions;
      
      
      document.getElementById("precip_today").innerHTML = precip_today;
      document.getElementById("local_time").innerHTML = local_time;
      document.getElementById("image_today").src = image_today;
      document.getElementById("location").innerHTML = location;
      document.getElementById("image_today").innerHTML = image_today;
      document.getElementById("precip_today").innerHTML = precip_today;
      document.getElementById("humidity_today").innerHTML = humidity_today;
      document.getElementById("wind_today").innerHTML = wind_today;
      document.getElementById("summary_today").innerHTML = summary_today;
      document.getElementById("temp_today").innerHTML = temp_today;
      document.getElementById("thermometer_inner").style.height = temp_today + "%";


      function getKey(i){
          var week_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];
          dayOfWeek=week_names[new Date(Object.keys(data.forecast)[i]).getDay()];
          return data.forecast[Object.keys(data.forecast)[i]];
      }

      /*
        Hint1 - To access the forecast data> You need to make sure to carefully see the JSON response to see how to access the forecast data. While creating the key to access forecast data make sure to convert it into a string using the toString() method.

        <Hint2 - To add the cards to the HTML> - Make sure to use string concatenation to add the html code for the daily weather cards.  This should
        be set to the innerHTML for the 5_day_forecast.
      */

      for(var i = 1; i < 6 ; i++){
        //console.log(getKey(i));
        var date = new Date(getKey(i).date);
        //console.log(date);
          var month = date.getMonth();
          var day = date.getDate();
          var yr = date.getFullYear();
          var dn = getDayofWeek(date,month , yr);

          //console.log(dn);
        var maxtemp = getKey(i).maxtemp;
        var mintemp = getKey(i).mintemp;
        var sunrise = getKey(i).astro.sunrise;
        var sunset = getKey(i).astro.sunset;
        const card = `<div style="width: 20%;">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${getDayofWeek(day ,month ,yr)}</h5>
            <p class="card-text">High:${maxtemp} <br>
              Low: ${mintemp}<br>
              Sunrise: ${sunrise} <br>
              Sunset: ${sunset}</p>
            </div>
          </div>
        </div>`;
        document.getElementById("5_day_forecast").innerHTML = card + document.getElementById("5_day_forecast").innerHTML ;
      }
    })
  
});

