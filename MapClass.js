
  // L.marker([51.941196,4.512291], {icon: redMarker}).addTo(map);

var mostRecentMarker = L.AwesomeMarkers.icon({
            // prefix : 'fa',
            icon: 'coffee',
            markerColor: 'red'
        });

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
        this._mapName = options && options.mapName ? options.DOM : 'map' + myMaps.length + 1;
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

    addEntry(entry){
        var m = this;
        console.log(this);
        console.log(entry);
        var marker = new L.marker(entry.getCoordinates(), mostRecentMarker).addTo(m.getMap());
        marker.bindPopup(entry.getDescription());
        marker.on("dblclick", (ev)=>entry.onClick());
    }

    // options = {showOpenStreetMap: (Boolean), centerCoordinates: [(float) Lat, (float) Long]?, zoom: (integer) level}
    showMap(options) {
        if (options) {
            console.log(options.centerCoordinates);
            console.log(options.centerCoordinates ? options.centerCoordinates : [0, 0]);
            this.getMap().setView(options.centerCoordinates && options.centerCoordinates[0] && options.centerCoordinates[1] ? options.centerCoordinates : [1, 0], options.zoom ? options.zoom : 1);
            console.log(this.getMap().getCenter());
            if (options.showOpenStreetMap) {
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(this.getMap());
            }
        }

    }

}