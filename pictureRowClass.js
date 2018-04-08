// Class to make a row of images with arrow buttons going both direction so you can look through pictures
// Conforms to scrollContainer interface


class pictureRow {

    constructor(parentDOM, options) {
    	this._parentDOM = parentDOM;
    	this._picturesPerRow = options&&options.picsPerRow ? options.picsPerRow : picsPerRow;
        this._pictures = [];
        this.makeRowDOM();
        // var spann = document.createElement("span");
        // spann.classList.add("span12");
        // this.getRowDOM().appendChild(spann);
        this.addChildren(this.getRowDOM());
        this.setCurrentLeftMost(0);
        this.setCurrentRightMost(0);
    }

    show(){
    	this._parentDOM.appendChild(this.getRowDOM());
    }

    getPictures(){
    	return this._pictures;
    }

    getRowDOM(){
    	return this._DOM;
    }

    makeRowDOM(){
    	var rowDOM = document.createElement('div');
        rowDOM.classList.add('row');
        rowDOM.classList.add('inlineElements');
        // rowDOM.classList.add('span12');
        this._DOM = rowDOM;
    }

    makeContentDOM(parentDOM){
    	this._contentDOM = document.createElement('div');
        // rowDOM.classList.add();
        this._contentDOM.classList.add('span10');
        this._contentDOM.style.display = 'inline';
       	parentDOM.appendChild(this._contentDOM);
    }

    getContentDOM(){
    	return this._contentDOM;
    }

    removeAllContent(){
    	var contentDOM = this.getContentDOM();
    	while (contentDOM.firstChild) {
    		contentDOM.removeChild(contentDOM.firstChild);
		}
		this._pictures = [];
		this.setCurrentRightMost(0);
		this.setCurrentLeftMost(0);
    }

    updateContent(imgsToShow){

    }

    scrollRight(){
    	console.log("ScrollRigth");
    	var contentDOM = this.getContentDOM();
    	// for (var i = 1; i<contentDOM.length; i++){
    		contentDOM.removeChild(contentDOM.childList[0]);
    		contentDOM.appendChild(this._pictures[this.getCurrentRightMost()]);
    	}
    

    scrollLeft(){
    	var contentDOM = this.getContentDOM();
    	// for (var i = 1; i<contentDOM.length; i++){
    		contentDOM.removeChild(contentDOM.childList[contentDOM.childList.length-1]);
    		contentDOM.insertBefore(this._pictures[this.getCurrentLeftMost()-2], contentDOM.childList[0]);
    	}
    

    getTotalNumberOfPics(){
    	return this.getPictures().length;
    }

    setCurrentLeftMost(newLeftMost){
		this._currentLeftMost = newLeftMost;

    }

    getCurrentLeftMost(){
		return this._currentLeftMost;

    }

    getCurrentRightMost(){
		return this._currentRightMost;
    }
    setCurrentRightMost(newRightMost){
		this._currentRightMost = newRightMost;

    }

    addLeftArrow(parentDOM){
    	var leftArrowDiv = document.createElement('div');
    	leftArrowDiv.classList.add("left_arrow_div");
    	leftArrowDiv.classList.add("span1");
    	leftArrowDiv.classList.add("vertical-align");
    	leftArrowDiv.innerHTML = leftArrowHTML;
    	this._leftArrowDiv = leftArrowDiv;
    	// this._leftArrowDiv.style.display = 'inline';
    	this._leftArrowDiv.onclick = () => {
    		this.leftArrowClick();
    	}
    	parentDOM.appendChild(this._leftArrowDiv);

    }

    updateArrowStyles(){
    	if (this.getTotalNumberOfPics==this.getCurrentRightMost()+1){
    		this._rightArrowDiv.style.fill = 'rgb(0,0,0)';
    	} else {
    		this._rightArrowDiv.style.fill = '#D3D3D3';
    	}
    	if (this.getCurrentLeftMost()==1){
    		this._leftArrowDiv.style.fill = 'rgb(0,0,0)';
    	} else {
    		this._leftArrowDiv.style.fill = '#D3D3D3';
    	}
    }

    rightArrowClick(){
    	if (this.getTotalNumberOfPics()>(this.getCurrentRightMost()+1)){
    		this.scrollRight(); // Implement logic here
    		setCurrentRightMost(getCurrentRightMost()+1);
    	}
    	this.updateArrowStyles();
    	
    }

      leftArrowClick(){
    	if (this.getCurrentLeftMost()>1){
    		this.scrollLeft(); // Implement logic here
    		setCurrentLeftMost(getCurrentLeftMost()-1);
    	}
    	this.updateArrowStyles();
    	
    }

    addRightArrow(parentDOM){
    	var rightArrowDiv = document.createElement('div');
    	rightArrowDiv.classList.add("right_arrow_div");
    	rightArrowDiv.classList.add("span1");
    	rightArrowDiv.classList.add("vertical-align");
    	rightArrowDiv.innerHTML = rightArrowHTML;
    	this._rightArrowDiv = rightArrowDiv;
    	// this._rightArrowDiv.style.display = 'inline';
    	this._rightArrowDiv.onclick = () => {this.rightArrowClick()};
    	parentDOM.appendChild(this._rightArrowDiv);
    }

    addChildren(parentDOM) {
    	this.addLeftArrow(parentDOM);
    	this.makeContentDOM(parentDOM);
    	this.addRightArrow(parentDOM);
    }

    getPicsPerRow(){
    	return this._picturesPerRow;
    }

    setPicPerRow(newNumber){
 		//TODO: Figure out this logic
    }

    addElements(pictureSources){
    	for (var i=0; i<pictureSources.length;i++){
    		this.addPicture(pictureSources[i]);
}    
}

    addPicture(pictureSrc) {
        //gets extension to decide how to show image
         // = pictureSrc;
        if (this.getCurrentLeftMost()==0){
        	this.setCurrentLeftMost(1);
        }

        var newImage = document.createElement('img');
        newImage.src = pictureSrc;
        newImage.style.height = "75%";
        var width = 100/this.getPicsPerRow();
        newImage.style.width = width + "%";
        this._pictures[this._pictures.length] = newImage;
        if (this._pictures.length<=this.getPicsPerRow()){
        	this.setCurrentRightMost(this._pictures.length);
        	var parent = this.getContentDOM();
        	parent.appendChild(newImage);
        }
        // if (this.)
        //newImage.id = ???
    }

}