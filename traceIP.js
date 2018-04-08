// Get the user's IP to calculate info

//THIS SCRIPT IS FOR IPINFO.IO

    var IP_data = {};


    // var fs = require('fs');
    // var request = require('request');

    var ipinfo_base_url = 'https://ipinfo.io';
    var ipinfo_loc_url = '/loc';
    var ipinfo_city_url = '/city';
    var ipinfo_country_url = '/country';

    var loc_url = ipinfo_base_url + ipinfo_loc_url;
    var count = 0;

    var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send( null );
    }
}




    function getLatitudeAndLongitude() {

     var newPromise =  new Promise(
        function(resolve, reject){
        
        client = new HttpClient();
        // var ret;
        var ret = client.get(loc_url, function(body){

    
        // request(loc_url, function(err, resp, body){
            if (body){
                console.log("body: "+body);
                var loc = body.split(",");
                var lat = loc[0].trim();
                var long = loc[1].trim();
                console.log(lat);
                 }

             // return new Promise(
                // function(resolve, reject) {
                    if (lat!=undefined && long!=undefined){
                        IP_data.latitude = lat;
                        IP_data.longitude = long;
                        console.log("About to resolve");
                        resolve([lat, long]);
                        // console.log("ret: "+ret);
                    } else {
                         reject(new Error("About to reject"));
                    }
                // }

            // );

            // successfulTrace
            //     .then(()=>{getCity()})
            //     .then(()=>{getCountry()})
            //     .then(()=> {console.log(IP_data);Promise.resolve()})
            //     .then(()=> {return Promise.resolve(true)})
            //     .catch(err => {console.log(err); return Promise.reject()});        
    });
// console.log("ret: "+ret);
// return ret;
}
             );
     return newPromise;}


    // if (count == 0) {
    //     request(loc_url, function(err, resp, body) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             var loc = body.split(",");
    //             lat = loc[0].trim();
    //             long = loc[1].trim();
    //             alert("Lat: " + lat + "\nLong: " + long);
    //             count++;


    //         }
    //     });
    // }

    var city_url = ipinfo_base_url + ipinfo_city_url;

    // if (count == 1) {
    //     request(city_url, function(err, resp, body) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             city = body.trim();
    //             alert("Cityyy: " + city);
    //             count++
    //         }
    //     });
    // }

        function getCity() {
        client = new HttpClient();
        client.get(city_url, function(body){
            if (body){
                console.log("getCityy");
             var city = body.trim();
             IP_data.city = city
             return Promise.resolve();
        }
        return Promise.reject();
            });
        }

    var country_url = ipinfo_base_url + ipinfo_country_url;
    // if (count == 2) {
    //     request(country_url, function(err, resp, body) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             country = body.trim();
    //             alert("Country: " + country);
    //             count++;
    //         }
    //     });
    // }

        function getCountry() {
        client = new HttpClient();
        client.get(country_url, function(body){
            if (body){
                console.log("getCountry");
             var country = body.trim();
             IP_data.country = country;
             return Promise.resolve();
        }
        return Promise.reject();
            });
        }


  
    
        function getIPinfo(){
            return getLatitudeAndLongitude()
                .then(()=>{getCity()})
                .then(()=>{getCountry()})
                .then(Promise.resolve())
                // .then(()=> {return Promise.resolve(true)})
                .catch(err => {Promise.reject(err)}); 
            }
        //         );
        //     return newPromise.then();
        // }







        // out.then(function(res){
        //     console.log("res " + res);
        // });
            // .then(()=> {console.log("got lat and long")})
            // .catch(()=> {console.log("Had an error")});
        // getLatitudeAndLongitude().then(() => {getCity();getCountry()}, (err)-> {console.log(err)});


        

    // var city_id = false;
    // if (count == 3) {
    //     $.getJSON("./city.list.json", function(data) {
    //         var num_entries = data.length;
    //         for (k = 0; k < num_entries; k++) {
    //             if (data[k]["name"] == city) {
    //                 if (data[k]["country"] == country) {
    //                     alert("Found city: " + city + "\nFound country: " + country);
    //                     city_id = data[k]["id"];
    //                     break;
    //                 }
    //             }
    //         }
    //         count++;
    //     });
    // }



    // var unit_type;
    // unit_type = 'imperial'; //or 'metric'

    // weather_map_api_key = 'e64686db377342adbab8d23b9309e2c9';
    // api_key_url = '&APPID=' + weather_map_api_key;
    // base_weather_map_url = 'http://api.openweathermap.org/data/2.5/weather?';

    // var url;
    // if (count == 5) {
    //     if (city_id) {
    //         url = base_weather_map_url + 'id=' + city_id + '&units=' + unit_type + api_key_url;
    //     } else {
    //         url = base_weather_map_url + "lat=" + lat + '&lon=' + long + api_key_url;
    //     }
    //     count++;
    // }


    // if (count == 6) {
    //     alert("Using this url: \n" + url);
    //     request(url, function(err, resp, body) {
    //         fs.writeFile('weatherdata.json', body, function(err) {
    //             if (err) {
    //                 console.log(err);
    //             }
    //         });
    //     });
    // }