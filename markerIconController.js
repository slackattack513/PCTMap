// markerIconController

class markerIconController {

    constructor(entryController) {
        L.AwesomeMarkers.Icon.prototype.options.prefix = 'fa';
        this._entryController = entryController;


    }


    getIcon(object) {

        switch (object.constructor.name) {
            case "Entry":
                if (this._entryController.isMostRecent(object)) {
                    return getMostRecentMarker();
                } else {
                	return this.getStandardEntryMarker();
                }

        }
    }

    getMostRecentMarker(options) {
        var mostRecentMarker = L.AwesomeMarkers.icon({
            // prefix : 'fa',
            icon: 'coffee',
            markerColor: 'red'
        });
        return mostRecentMarker;
    }

    getStandardEntryMarker(options) {
    	var stdIcon = L.AwesomeMarkers.icon({
    		icon: 'map',
    		markerColor: 'red'
    	});
        return stdIcon;
    }
}