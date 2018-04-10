// Get weather map





// weather_api_key_url = '&APPID=' + api_key
// base_weather_url = 'http://api.openweathermap.org/data/2.5/weather?'
// url = 'http://api.openweathermap.org/data/2.5/weather?id=5313457&units=' + unit_type + '&APPID=' + api_key
// 'http://api.openweathermap.org/data/2.5/weather?id=5313457&units=imperial&APPID=e64686db377342adbab8d23b9309e2c9'


var lat = 0;
var long = 0;
// var apiURL = 'https://tile.openweathermap.org/map/precipitation_new/1/'+lat+'/'+long+'.png?appid=' + api_key;



//  var HttpClient = function() {
//     this.get = function(aUrl, aCallback) {
//         var anHttpRequest = new XMLHttpRequest();
//         anHttpRequest.onreadystatechange = function() { 
//             if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
//                 aCallback(anHttpRequest.responseText);
//         }

//         anHttpRequest.open( "GET", aUrl, true );            
//         anHttpRequest.send( null );
//     }
// }