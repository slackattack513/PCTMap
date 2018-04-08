// DetailedEntryModule

class detailedEntryModule {

	constructor(entry, parent){
		this._parentNode = parent;
		this.setEntry(entry);
		this.makeContainer();
	}

	createDetailedTextDOM(options){
		this._detailedTextDOM = document.createElement('p');
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

	removeCSSClass(oldClass){
		this.getContainer().classList.remove(oldClass);
	}

	addCSSClass(newClass){
			this.getContainer().classList.add(newClass)
		}

	getParentNode(){
		return this._parentNode;
	}

	setParentNode(parent){
		this._parentNode = parent;
	}

	changeParentNode(newParent){
		this.removeFromParent();
		this.setParentNode(newParent);

	}

	showOnParent(){
		this.getParentNode().appendChild(this.getContainer());
	}

	removeFromParent(){
	this.getParentNode().removeChild(this.getContainer());
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

	getContainer(){
		return this._container;
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

	makeContainer(){
		this._container = document.createElement("div");
		var textDOM = this.createDetailedTextDOM();
		this.setDetailedText();
		var picRow = this.createPictureRow();
		this.updatePicRow();
		this._container.appendChild(textDOM);
		this._container.appendChild(picRow.getRowDOM());
	}




}