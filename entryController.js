// entryController

class entryController {
    constructor(entries) {
        this._entries = entries||{};
        this._mostRecent = undefined;
    }

    addEntry(label, entry) {
        if (!this._entries[label]) {
            this._entries[label] = entry;
            this.updateMostRecent(label, entry);
        }

    }

    updateMostRecent(newLabel, entry){
    	this._mostRecentLabel = newLabel;
    	this._mostRecentEntry = entry;
    }

    getMostRecentEntry() {
    	return this._mostRecentEntry;
    }

    isMostRecent(entry){
    	var mr = this.getMostRecentEntry();
    	return mr==entry;
    }


    // tags -> entry, data
    updateEntry(label, tag) {
        if (this._entries[label] && tag) {
            if (tag.entry) {
                this._entries[label] = newEntry;
            
        } else if (tag.data){
        	// What to do if given new data
        }

    }

}
	getEntry(label){
		return this._entries[label] || undefined;
	}
	
	getAllEntries(){
		var ret = [];
		Object.entries(this._entries).forEach(([key, value])=>ret.push(value));
		return ret;
	}



}