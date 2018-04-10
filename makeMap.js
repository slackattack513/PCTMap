var myStyle = {
    "color": "black",
    "weight": 1,
    "opacity": 0.65
};


var mapArray = [
    []
];


var fs = require("fs");


var api_key = 'e64686db377342adbab8d23b9309e2c9';
var rain = L.OWM.rain({appId: api_key});


function makeMap(options) {
    var DOM_ID = options && options.id ? options.id : 'map';
    var mymap = new Map(DOM_ID);
    var PCTData = JSON.parse(fs.readFileSync('pct.JSON', 'utf8'));
    PCTLayer = new GeoJSONLayer({ "data": PCTData, "map": mymap.getMap(), "style": myStyle });
    
	// var OSMLayer = mymap.getOSMLayer();
	// var baseMaps = {"OSM": OSMLayer};
	// var overlayMaps = {"Rain": rain};

    // var layerControl = L.control.layers(baseMaps, overlayMaps);
	// layerControl.addTo(mymap.getMap());

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