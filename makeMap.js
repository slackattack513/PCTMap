var myStyle = {
    "color": "black",
    "weight": 1,
    "opacity": 0.65
};


var mapArray = [
    []
];


var fs = require("fs");

function makeMap(options) {
    var DOM_ID = options && options.id ? options.id : 'map';
    var mymap = new Map(DOM_ID);
    var PCTData = JSON.parse(fs.readFileSync('pct.JSON', 'utf8'));
    PCTLayer = new GeoJSONLayer({ "data": PCTData, "map": mymap.getMap(), "style": myStyle });
    return mymap;
}

// console.log("Map:")
// console.log(mymap.getMap());
// var PCTLayer;
// // L.map('map').setView([33, -116], 13);



// console.log("PCTData: "+ PCTData);
// // $.getJSON("./PCTMap/pct.JSON", function(data) {
//     console.log(mymap.getMapName());


// console.log("IP_data in makeMap: "+IP_data.latitude);