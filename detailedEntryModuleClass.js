// DetailedEntryModule

class detailedEntryModule extends generalModule{

	constructor(object, parent){
		/*this._parentNode = parent;
		this.makeContainer();
		this.fillContainer();*/
		super(object, parent);
	}

	createDetailedTextDOM(options){
		this._detailedTextDOM = this.createElement('p');
		return this._detailedTextDOM;
	}

	getDetailedTextDOM(){
		return this._detailedTextDOM;
	}

	setDetailedText(){
		var DOM = this.getDetailedTextDOM();
		switch (DOM.nodeName){
			case "P":
				DOM.innerHTML = this.getEntry().getFullText();
				break;
			default:
				DOM.nodeValue = this.getEntry().getFullText();
		}
	}

	setEntry(entry){
		this._entry = entry;
	}

	getEntry(){
		return this._entry;
	}

	swapEntry(newEntry){
		this.setEntry(newEntry);
		this.setDetailedText();
		this.updatePicRow();
	}


	updatePicRow(){
		this.getPictureRow().removeAllContent();
		this.getPictureRow().addElements(this.getEntry().getPictureURLS());
	}
	createPictureRow(){
		this._picRow = new pictureRow();
		return this._picRow;
	}

	getPictureRow(){
		return this._picRow;
	}


	fillContainer(){
		var textDOM = this.createDetailedTextDOM();
		this.setDetailedText();
		var picRow = this.createPictureRow();
		this.updatePicRow();
		this._container.appendChild(textDOM);
		this._container.appendChild(picRow.getRowDOM());
	}

	acceptObject(object){
		if (object.constructor.name == "Entry"){
		this.setEntry(object);
	} else {
		console.error('Tried to pass an oject to detailedEntryModuleClass that is not an Entry object!\n');
	}
	}




}