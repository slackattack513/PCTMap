// Submission Data

class Entry {
	
	constructor(options){
	if (options){
		this._markerIconController = options.markerIconController || undefined;
		this._controller = options.controller || undefined;
		this._fullText = options.fullText || "";
		this._description = options.description || "";
		this._coordinates = options.coordinates || [];
		this._onDblClickDOMText = options.onDoubleClickDOMText || undefined;
		this._onDblClickDOMImages = options.onDoubleClickDOMImages || undefined;
		this._pictures = options.pictures || undefined;
		this._onDoubleClick = options.onDoubleClick || undefined;
	}
	}

	getPictureURLS(){
		return this._pictures;
	}

	getDescription(){
	return this._description
	}

	getController(){
		return this._controller;
	}
	getFullText(){
	return this._fullText;
	}

	getCoordinates(){
		return this._coordinates;
	}

	getLatitude(){
	return this.getCoordinates()[0];
	}

	getLongitude(){
	return this.getCoordinates()[1];
	}

	getMarkerIconController(){
		return this._markerIconController;
	}

	getIcon(){
		var cont = this.getMarkerIconController();
		return cont.getIcon(this);
	}

	onClick(){
		if (this._onDoubleClick){
			this.getController().apply(this._onDoubleClick, this, "entry");
		} else {
		if (this._onDblClickDOMText){
			this._onDblClickDOMText.innerHTML = this.getFullText();
			// var im = document.createElement('img')
			// im.src = './GE1.pdf';
			// this._onDblClickDOMImages.appendChild(im)
			// console.log("im: ");
			// console.log(im);
		}

		if (this._onDblClickDOMImages){
			this._onDblClickDOMImages.show();
			console.log("pic URLS: ");
			console.log(this.getPictureURLS());
			this._onDblClickDOMImages.addElements(this.getPictureURLS());
			// for (var i =0; i< this.getPictureURLS().length;i++){
			// 	console.log("im: ");
			// 	var im = this.getPictureURLS()[i];
			// 	console.log(im);
			// 	var newIm = document.createElement("img");
			// 	newIm.id=im;
			// 	newIm.src=im;
			// 	this._onDblClickDOMImages.appendChild(newIm);
			// }
			
		}
	}
	}

	save(){

	}

	load(){

	}


}