// generalModule interface for reuse

class generalModule {
    // object - some object with data to be shown
    /* parent? - optional parent node for this module to be appended to
    			if not defined, then setParentNode(parent) must be called prior to removeFromParent() or showOnParent()*/
    constructor(object, parent) {
        this._parentNode = parent;
        this.acceptObject(object);
        this.makeContainer();
        this.fillContainer();
    }

    removeCSSClass(oldClass) {
        this.getContainer().classList.remove(oldClass);
    }

    addCSSClass(newClass) {
        this.getContainer().classList.add(newClass)
    }

    getParentNode() {
        return this._parentNode;
    }

    setParentNode(parent) {
        this._parentNode = parent;
    }

    changeParentNode(newParent) {
        this.removeFromParent();
        this.setParentNode(newParent);

    }

    showOnParent() {
    	console.log('Trying to show on parent');
        this.getParentNode().appendChild(this.getContainer());
    }

    removeFromParent() {
        this.getParentNode().removeChild(this.getContainer());
    }

    getContainer() {
        return this._container;
    }

    // Creates the outer DOM Element of the module - unless overwitten, container is a DIV
    makeContainer() {
        this._container = document.createElement("div");
        this._container.classList.add("container");
        this._container.style.width = "100%";

    }

    createElement(type){
    	return document.createElement(type);
    }

    // Fills the outer container of the module
    fillContainer() {
        /* Should be overwritten by subclasses*/
    }

    // Performs class specific logic with the object given to the module
    acceptObject(object) {
        /* Should be overwritten by subclasses*/
    }
}