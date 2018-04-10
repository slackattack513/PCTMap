// L.marker([51.941196,4.512291], {icon: redMarker}).addTo(map);

var mostRecentMarker = L.AwesomeMarkers.icon({
    prefix: 'fa',
    icon: 'coffee',
    markerColor: 'red'
});

var myStyle = {
    "color": "black",
    "weight": 1,
    "opacity": 0.65
};

fs = require("fs");

function makeMap(options) {
    var mvCont = options && options.mainViewController ? options.mainViewController : undefined;
    var DOM_ID = options && options.id ? options.id : 'map';
    var mymap = new Map(DOM_ID, {"mainViewController" : mvCont});
    var PCTData = JSON.parse(fs.readFileSync('pct.JSON', 'utf8'));
    PCTLayer = new GeoJSONLayer({ "data": PCTData, "map": mymap.getMap(), "style": myStyle });

    return mymap;
}

class Map {

    constructor(ElementID, options) {

        

        if (!ElementID) {
            var DOMToMake = options && options.DOM ? options.DOM : 'div';
            this._map_dom = L.DOMUtil.create(DOMToMake, 'default_map_class');
        } else {
            // console.log("in else");
            this._map_dom = document.getElementById(ElementID);
        }
        // console.log("map DOM");
        // console.log(this._map_dom);
        this._map = new L.map(this._map_dom);
        this.makeMarkerLayerGroup();
        this.addZoomAndMapPanHandling();
        this._mapName = options && options.mapName ? options.DOM : 'map' + myMaps.length + 1;

        /*

        Need to fix all of these controller dependencies ASAP

        */
        this._mainViewController = options && options.mainViewController ? options.mainViewController : undefined;
        this._popupController = new popupController();
        this._markerController = new markerController();
        this._markerIconController = new markerIconController(this._mainViewController.getEntryController());
        // this.addZoomHandling();
    }

    /*
    (int containerSize) will be a number that defines a square cell's length and width as fraction of the smaller dimension
    The shown map will comprise ceil(1/containerSize) squares in the smaller dimension, and ceil(largerDimension/(smallerDimension*containerSize)) squares in largerDimension

    ceil(map_width/containerSize) * ceil(map_height/containerSize) cells. 

    If there exist one or more markers in a cell, a single marker will be put in that cell that contains all of these markers' info. 

    The info will be presented in the popup in some scrollable form. 

    addZoomHandling will be called any time (?? or perhaps every 2-3-X zoom levels) the map is zoomed

    This ensures that when zoomed out an overall look at the existing markers is obvious but when zoomed in, detail can be achieved.


    */
    addZoomAndMapPanHandling() {

        this.getMap().on("zoomend", (event) => {
            // console.log("zoomend");
            this.updateMarkersToShowOnMapChange(event);

        });

        this.getMap().on("moveend", (event) => {
            this.updateMarkersToShowOnMapChange(event);
        });


    }

    updateMarkersToShowOnMapChange(event) {
        this.clearMarkerLayerGroup();
        this.showAllMarkersInRange();
    }

    getAllMarkersInMapBounds() {
        console.log(this.getMap().getBounds());
        // console.log(this.getMap().getPixelBounds());
        // console.log(this.getMap().getSize());
        //  var mapHeight = this.getDOM().clientHeight; //pixels
        // var mapWidth = this.getDOM().clientWidth;
        // console.log("mapheight "+ mapHeight);
        // console.log("mapwidth "+ mapWidth);
        var bounds = this.getMap().getBounds();
        var range = [bounds.getWest(), bounds.getEast(), bounds.getSouth(), bounds.getNorth()]; // Since globe is sphere west will not always be less than east at intl date line but i believe this issue is already taken care of
        var markersInRange = this.getMarkerController().getMarkersInBounds({ "range": range });
        return markersInRange;
    }

    showAllMarkersInRange() {
        var markersInRange = this.getAllMarkersInMapBounds();
        for (var i = 0; i < markersInRange.length; i++) {
            this.addToMarkerLayerGroup(markersInRange[i]);
        }
    }

    filterMarkersBasedOnZoom() {
        var size = this.getMap().getSize();
        var mapHeight = size.y; //pixels
        var mapWidth = size.x;

        // These are hardcoded - how can I change that? TODO.
        var markerHeight = 46; //pixels
        var markerWidth = 35;

        var mapBounds = this.getMap().getBounds();
        console.log(this.getMap().getBounds());
        var latDiff = mapBounds.getNorth() - mapBounds.getSouth();
        var longDiff = mapBounds.getEast() - mapBounds.getWest(); //Might have to improve 

        var markerOverlapVertical = .5; // Needs to be transformed into frac, then do frac/(2+frac) to accurately get the overlap
        var boundingBoxVerticalHeight = (1 / markerOverlapVertical) / (2 + (1 / markerOverlapVertical)) * markerHeight / mapHeight * latDiff; // Coordinate height for box


        var markerOverlapHorizontal = .25;
        var boundingBoxHorizontalHeight = (1 / markerOverlapHorizontal) / (2 + (1 / markerOverlapHorizontal)) * markerWidth / mapWidth * longDiff; // Coordinate width for box

        var nw = mapBounds.getNorthWest();

        var markersInRange = this.getAllMarkersInMapBounds();

        for (var startLong = nw.x; startLong <= mapBounds.getEast(); startLong += boundingBoxHorizontalHeight) {
            for (var startLat = nw.y; startLat >= mapBounds.getSouth(); startLat -= boundingBoxVerticalHeight) {
                var nwCorner = L.latLng(startLat, startLong);
                var seCorner = L.latLng(startLat - boundingBoxVerticalHeight, startLong + boundingBoxHorizontalHeight);
                var thisBoxLatLng = L.latLngBounds(nwCorner, seCorner);
                var markersInThisBox = [];
                // Check which markers are in this box
                markersInRange.forEach((elem) => {
                    if (thisBoxLatLng.contains(elem.getLatLng())) {
                        markersInThisBox.push(elem);
                    }
                });

                // Remove markers
                markersInThisBox.forEach((elem) => {
                    var elemIndex = markersInRange.indexOf(elem);
                    markersInRange.splice(elemIndex, 1); // remove this marker from the markers to iterate through
                });

                createRepresentativeMarker(markersInThisBox, thisBoxLatLng); // Creates the marker corresponding to the markers in this box
            }
        }

    }

    /* Creates a marker to represent one or more markers at different zoom levels
    
    markers - array of L.marker objects
    latLngBounds - L.latLngBounds object that contains all of the passed markers

    */
    createRepresentativeMarker(markers, latLngBounds) {
        /*

        I think I really need to extend the L.marker class so that my markers can have their own data. Data should conform to an interface that allows
        for a quick description, images, full text description, etc. If I do this, then I need to decide details though: is my data fundamentall a marker? Or do 
        i want to separate markers from the actual data? What are pros, cons? If I keep data as a separate class than markers, this means I can use it elsewhere 
        when there is no need for any of the functionality a marker provides. However, if my data is primarily meant to be associated with a set of coordinates, then doesnt it 
        already make sense to extend it from a marker? 

        */
        if (markers.length != 0) {
            if (markers.length == 1){
                var soloMarker = markers[0];
            var marker = new L.marker(soloMarker.getLatLng(), {icon: this.getIcon(entry) }); //.addTo(m.getMap());
            marker.bindPopup(() => { return this.getPopupController().getPopupContent(entry) });
            marker.on("popupopen", (event) => { marker.setIcon(this.getActiveIcon(entry)) });
            marker.on("popupclose", (event) => { marker.setIcon(this.getIcon(entry)) });
            } else {

            }
            
        }



    }

    getMarkerIconController() {
        return this._markerIconController;
    }

    /* 

    Allows a controller/factory to determine what icon to be used on the marker for some type of data
    
    object - some class that contains data and is used to identify a marker on the map

    */
    getIcon(object) {
        var cont = this.getMarkerIconController();
        return cont.getIcon(object);
    }


    /* 

    Allows a controller/factory to determine what icon to be used on the marker for some type of data WHEN THAT MARKER IS SELECTED
    
    object - some class that contains data and is used to identify a marker on the map
    
    */
    getActiveIcon(object) {
        var cont = this.getMarkerIconController();
        return cont.getActiveIcon(object);
    }



    /*

    Gets the layerGroup on which all markers for the map will be put
    
    returns - L.layerGroup object 

    */

    getMarkerLayerGroup() {
        return this._markerLayerGroup;
    }

    /*
    
    Adds a marker to the marker layerGroup for the map

    marker - L.marker object

    */

    addToMarkerLayerGroup(marker) {
        this.getMarkerLayerGroup().addLayer(marker);
    }

    /*

    Makes the marker layerGroup for markers to be placed

    */

    makeMarkerLayerGroup() {
        this._markerLayerGroup = new L.layerGroup().addTo(this.getMap());
    }


    /*

    Removes all markers and other layers currently on the layerGroup from the layerGroup

    */

    clearMarkerLayerGroup() {
        this.getMarkerLayerGroup().clearLayers();
    }

    /*

    Returns the L.map object associated with this Map class

    return - L.map

    */

    getMap() {
        return this._map;
    }

    /*

    Returns the HTML DOM element in which this map was placed

    */

    getDOM() {
        return this._map_dom;
    }

    getMapName() {
        return this._mapName;
    }

    getPopupController() {
        return this._popupController;
    }

    getMarkerController() {
        return this._markerController;
    }

    addMarkerToController(marker) {
        this.getMarkerController().addMarker(marker);
    }

    showMarkers() {

    }

    /*

    Will take an Entry class object and add it to the map with a marker. Calls popupController to determine the content for the popup of the marker.
    Calls markerIconController to choose an icon for the object. Ideally, Entry will be just one piece of data that can be placed on a map. The controllers
    will allow the Map code to be fully encapsulated for future updates once a stable architecture exists. New objects of data will be created that conform to a certain
    interface. The controller code can be changed to implement more features. But the map code will stay the same. Lastly, the generated marker is added to the markerController
    to be kept track of so that after resizing and moving the map not all markers must be added to the map, and so that there is a controller that will manage the markers. I.e., 
    it is easy to envision that upon toggling certain buttons different markers should become visible or inviisble. This can probably be achieved with an extension of 
    some existing class in Leaflet. I should look into that. 

    
    entry - Entry class object 


    */

    addEntry(entry) {
        var m = this;
        console.log(this);
        console.log(entry);
        var marker = new L.marker(entry.getCoordinates(), {icon: this.getIcon(entry)}); //.addTo(m.getMap());
        marker.bindPopup(() => { return this.getPopupController().getPopupContent(entry) });
        marker.on("popupopen", (event) => { marker.setIcon(this.getActiveIcon(entry)) });
        marker.on("popupclose", (event) => { marker.setIcon(this.getIcon(entry)) });
        this.addMarkerToController(marker);
        // marker.on("dblclick", (ev)=>{entry.onClick(); console.log(marker); marker.setIcon(entry.getActiveIcon())});
    }



    /*

    Gets the standard OpenStreetMap that most people appear to use and returns it in a L.tileLayer to be shown on the map. 

    return - L.tileLayer of OpenStreetMap


    */
    getOSMLayer() {
        return L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
    }

    // options = {showOpenStreetMap: (Boolean), centerCoordinates: [(float) Lat, (float) Long]?, zoom: (integer) level}

    /*

    Actually renders the map upon this call. Rendering depends on the options passed

    options -
        centerCoordinates - integer [] used to define the center position of the map upon rendering
        zoom : integer - defines the initial zoom level
        showOpenStreetmap : boolean - decides if the openStreetmap should be added to the map (as opposed to, say, future options allowing other maps to be chosen)

    */
    showMap(options) {
        if (options) {
            console.log(options.centerCoordinates);
            console.log(options.centerCoordinates ? options.centerCoordinates : [0, 0]);
            this.getMap().setView(options.centerCoordinates && options.centerCoordinates[0] && options.centerCoordinates[1] ? options.centerCoordinates : [1, 0], options.zoom ? options.zoom : 1);
            console.log(this.getMap().getCenter());
            if (options.showOpenStreetMap) {
                this.getOSMLayer().addTo(this.getMap());
            }
        }

    }

}