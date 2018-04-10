// Controller Class


class mainViewController {

    constructor(main_content) {
        this._modules = {};
        this._main_content = main_content;
        this._current_sub_module = undefined;
        this._entryModule = undefined;
    }


    addModule() {

    }

    apply(process, object) {
        switch (object.constructor.name) {
            case "Entry":
                if (process == "showEntryModule") {
                    if (!this.getEntryModule()) {
                        var newEntryModule = new detailedEntryModule(object, this._main_content);
                        this.setEntryModule(newEntryModule);
                        this.updateSubModule(this.getEntryModule());
                    } else {
                        var eModule = this.getEntryModule();
                        eModule.swapEntry(object);
                        this.updateSubModule(eModule);
                    }
                }


        }
    }

    setEntryController(eC){
    	this._entryController = eC;
    }

    getEntryController(){
    	return this._entryController;
    }

    getModule(label){
		return this._modules[label];
    }

    setModule(label, object){
    	object.setParentNode(this._main_content);
    	this._modules[label] = object;
    	return object;
    }

    getEntryModule() {
        return this._modules.entryModule;
    }

    setEntryModule(newEntryModule) {
        this._modules.entryModule = newEntryModule;
    }

    updateSubModule(newModule) {
        // if (this.getCurrentSubModule() && (this.getCurrentSubModule()!=newModule)){
        	console.log("Updating subModule");
        	console.log("new module: "+newModule);
        	console.log("submodule: "+this.getCurrentSubModule());
        if (newModule!=this.getCurrentSubModule() ) {
            if (this.getCurrentSubModule()) {
                this.getCurrentSubModule().removeCSSClass("sub_map_module");
                this.getCurrentSubModule().removeFromParent();
            }
            this.setCurrentSubModule(newModule);
            this.getCurrentSubModule().addCSSClass("sub_map_module")
            this.getCurrentSubModule().showOnParent();
        }
    }

    getCurrentSubModule() {
        return this._current_sub_module;
    }

    setCurrentSubModule(newModule) {
        this._current_sub_module = newModule;
    }
}