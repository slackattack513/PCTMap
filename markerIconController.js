// markerIconController

class markerIconController {

    constructor(entryController) {
        L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
        this._entryController = entryController;


    }


    getIcon(object) {
        console.log("In getIcon");
        console.log("icon object: "+object.constructor.name);
        switch (object.constructor.name) {
            case "Entry":
                if (this._entryController.isMostRecent(object)) {
                    return this.getMostRecentMarker();
                } else {
                	return this.getStandardEntryMarker();
                }

        }
    }

    getMostRecentMarker(options) {
        var mostRecentMarker = L.AwesomeMarkers.icon({
            // prefix : 'fa',
            icon: 'exclamation',
            markerColor: 'red'
        });
        return mostRecentMarker;
    }

    getStandardEntryMarker(options) {
        console.log("getting standard marker");
    	var stdIcon = L.AwesomeMarkers.icon({
    		icon: 'map',
    		markerColor: 'red'
    	});
        return stdIcon;
    }
}