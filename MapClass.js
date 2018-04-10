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
    var DOM_ID = options && options.id ? options.id : 'map';
    var mymap = new Map(DOM_ID);
    var PCTData = JSON.parse(fs.readFileSync('pct.JSON', 'utf8'));
    PCTLayer = new GeoJSONLayer({ "data": PCTData, "map": mymap.getMap(), "style": myStyle });

    return mymap;
}

class Map {

    constructor(ElementID, options) {

        var DOMToMake = options && options.DOM ? options.DOM : 'div';

        if (!ElementID) {
            this._map_dom = L.DOMUtil.create(DOMToMake, 'default_map_class');
        } else {
            console.log("in else");
            this._map_dom = document.getElementById(ElementID);
        }
        console.log("map DOM");
        console.log(this._map_dom);
        this._map = new L.map(this._map_dom);
        this.makeMarkerLayerGroup();
        this.addZoomHandling(Math.floor(500 / 25));
        this._mapName = options && options.mapName ? options.DOM : 'map' + myMaps.length + 1;
        this._popupController = new popupController();
        this._markerController = new markerController();
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
    addZoomHandling(containerSize) {
        //     var markerpane = this.getMap().getPane("markerPane");
        //     console.log(markerpane);
        //     var children = markerpane.childNodes;
        //     if (children[0]){
        //     var firstchild = children[0];
        //     console.log(firstchild);
        //     console.log(firstchild.style.transform);
        // }

        // Will want to 

        this.getMap().on("zoomend", (event) => {
            // console.log("zoomend");
            this.updateMarkersToShowOnMapChange(event);

        })
    }

    updateMarkersToShowOnMapChange(event) {

        this.clearMarkerLayerGroup();
        // this.getMap().eachLayer(function(layer){
        //     console.log(layer); 
        //     if (layer&&layer.getPane()&& layer.getPane()=="markerPane"){
        //         layer.remove();}
        //     });

        var bounds = this.getMap().getBounds();
        var range = [bounds.getWest(), bounds.getEast(), bounds.getSouth(), bounds.getNorth()]; // Since globe is sphere west will not always be less than east at intl date line
        var markersToShow = this.getMarkerController().getMarkersInBounds({ "range": range });
        // console.log("markerstoshow");
        // console.log(markersToShow);

        for (var i = 0; i < markersToShow.length; i++) {
            // if ()
            // console.log(markersToShow[i]);
            this.addToMarkerLayerGroup(markersToShow[i]);
            // markersToShow[i].addTo(this.getMap());
        }

    }

    getMarkerLayerGroup() {
        return this._markerLayerGroup;
    }

    addToMarkerLayerGroup(marker) {
        this.getMarkerLayerGroup().addLayer(marker);
    }

    makeMarkerLayerGroup() {
        this._markerLayerGroup = new L.layerGroup().addTo(this.getMap());
    }

    clearMarkerLayerGroup() {
        this.getMarkerLayerGroup().clearLayers();
    }

    getMap() {
        return this._map;
    }

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

    addEntry(entry) {
        var m = this;
        console.log(this);
        console.log(entry);
        var marker = new L.marker(entry.getCoordinates(), { icon: entry.getIcon() }); //.addTo(m.getMap());
        marker.bindPopup(() => { return this.getPopupController().getPopupContent(entry) });
        marker.on("popupopen", (event) => { marker.setIcon(entry.getActiveIcon()) });
        marker.on("popupclose", (event) => { marker.setIcon(entry.getIcon()) });
        this.addMarkerToController(marker);
        // marker.on("dblclick", (ev)=>{entry.onClick(); console.log(marker); marker.setIcon(entry.getActiveIcon())});
    }

    getOSMLayer() {
        return L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        });
    }

    // options = {showOpenStreetMap: (Boolean), centerCoordinates: [(float) Lat, (float) Long]?, zoom: (integer) level}
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