// markerIconController

class markerIconController {

    constructor(entryController) {
        L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
        this._entryController = entryController;


    }


    getIcon(object) {
        // console.log("In getIcon");
        // console.log("icon object: " + object.constructor.name);
        switch (object.constructor.name) {
            case "Entry":
                if (this._entryController.isMostRecent(object)) {
                    return this.getMostRecentMarker();
                } else {
                    return this.getStandardEntryMarker();
                }

        }
    }

    getActiveIcon(object) {
        // console.log("In getActiveIcon");
        // console.log("icon object: " + object.constructor.name);
        var basicIcon = this.getIcon(object);
        // console.log(basicIcon);
        basicIcon.options.markerColor = "green";
        // console.log("basicicon: " + basicIcon);
        return basicIcon;
        // switch (object.constructor.name) {
        //     case "Entry":


        // }
    }

    getMostRecentMarker(options) {
        var mostRecentMarker = new L.AwesomeMarkers.icon({
            // prefix : 'fa',
            icon: 'exclamation',
            markerColor: 'red'
        });
        return mostRecentMarker;
    }

    getStandardEntryMarker(options) {
        // console.log("getting standard marker");
        var stdIcon = new L.AwesomeMarkers.icon({
            icon: 'map',
            markerColor: 'red'
        });
        return stdIcon;
    }
}

class markerController {
        constructor(markers) {
            this._markersMap = {};
            if (markers){
            for (var i = 0; i < markers.length; i++) {
                this.addMarker(markers[i]);
            }
        }

        }


        addMarker(marker) {
            var latitude = marker.getLatLng().lat;
            var latFloored = Math.floor(latitude);

            if (!this.markersMapHasKey(latFloored)) {
                this.markersMapCreateKey(latFloored);
            }
            this.markersMapAdd(latFloored, marker);
        }

        markersMapHasKey(key) {
            return (key in this._markersMap);
        }

        markersMapCreateKey(key) {
            this._markersMap[key] = [];
        }

        // Adds a marker to the value - which is an array -  at ._markersMap[key]
        markersMapAdd(key, marker) {
            this._markersMap[key].push(marker);
        }

        getMarkersMap() {
            return this._markersMap;
        }

        // keys - {min: #, max: #}
        getMarkersFromKeysAsList(keys) {
            // console.log("getMarkersfromkeysaslist");
            // console.log(keys);
            var ret = [];
            var allMarkers = this.getMarkersMap();
            // console.log("allMarkers");
            // console.log(allMarkers);
            if (!keys || (keys && keys == "all")) {
                // Values are arrays of markers
                for (var value in Object.values(allMarkers)) {
                    // merge into return array
                    ret = ret.concat(value);
                }

            } else {
                // for (var i = 0; i < keys.length; i++) {

                    // var ensureFloored = Math.floor(keys[i]);
                    var existingKeys = Object.keys(this.getMarkersMap());
                    // console.log("Existing keys:");
                    // console.log(existingKeys);
                    var validKeys = existingKeys.filter((k)=>{return k>=parseInt(keys.min)&&k<=(parseInt(keys.max)+10)});
                    // console.log("ValidKeys");
                    // console.log(validKeys);
                for (var i = 0; i < validKeys.length; i++) {
                    // if (this.markersMapHasKey(ensureFloored)) {
                        ret = ret.concat(allMarkers[validKeys[i]]);
                    }

                }
            
            return ret;
        }

        /* LatLongInfo
        range: [minLat, maxLat, minLong, maxLong]
        latRange: [minLat, maxLat]
        longRange[minLong, maxLong]
        exactLat:[lat1, lat2, ...]
        exactLong[long1, long2, ...]
        exact: {lat: [lat1, lat2, ...], long: [long1, long2, ...]}


        Gets markers matching valid longitudes from the _markersMap and then filters out markers if they have valid latitudes
        */
        getMarkersInBounds(LatLongInfo) {
            console.log("latlnginfo");
            console.log(LatLongInfo);
            var ret = [];
            if (!LatLongInfo) {
                return this.getMarkersFromKeysAsList("all");
            } else {

                var keys = [];
                var returnedMarkers;
                var filteredMarkers;

                if (LatLongInfo.range) { 
                    var range = LatLongInfo.range;
                    if (range.length!=4){ // Doesnt comply with API Syntax -> return all markers
                        return this.getMarkersFromKeysAsList("all");
                    } else {
                        var minLong = range[0];
                        var maxLong = range[1];
                        var minLat = range[2];
                        var maxLat = range[3];



                        // for (var i = Math.floor(minLong); i<=Math.floor(maxLong); i+=10) {
                        //     keys.push(i);
                        // }
                        returnedMarkers = this.getMarkersFromKeysAsList({"min":minLat, "max": maxLat});
                        // console.log("before filtering latitude");
                        // console.log(returnedMarkers);
                        filteredMarkers = this.filterByLongitude(returnedMarkers, {"min":minLong, "max":maxLong});
                    }



                } else if (LatLongInfo.exact) {

                } else {
                    if (LatLongInfo.latRange) {

                    }

                    if (LatLongInfo.longRange) {

                    }

                    if (LatLongInfo.exactLat) {

                    }

                    if (LatLongInfo.exactLong) {

                    }



                }


            }
            // console.log("to return filtered");
            // console.log(filteredMarkers);
            return filteredMarkers;

        }

        // longitudeRange - {min: #, max:#}
        filterByLongitude(markersToFilter, longitudeRange){

            return markersToFilter.filter((marker)=>{return marker.getLatLng().lng>=longitudeRange.min&&marker.getLatLng().lng<=longitudeRange.max});
            // var ret =[];
            // for (var i=0; i<markersToFilter.length;i++){
            //     var specificMarker = markersToFilter[i];
            //     var markerlat = specificMarker.getLatLng().lat;
            //     if (markerlat>latitudeRange.min && markerlat<latitudeRange.max){
            //         ret.push(specificMarker);
            //     }
            // }

            // return ret;
    

        }
    }