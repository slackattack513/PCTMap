// Controller Class


class mainViewController {

	constructor(main_content){
		this._modules = {};
		this._main_content = main_content;
		this._current_sub_module = undefined;
		this._entryModule = undefined;
	}


	addModule(){

	}

	apply(process, object, type){
		switch (type){
			case "entry":
				if (process == "showEntryModule"){
					if (!this.getEntryModule()){
						var newEntryModule = new detailedEntryModule(object, this._main_content);
						this.setEntryModule(newEntryModule);
						this.updateSubModule(this._entryModule);
					} else {
						var eModule = this.getEntryModule();
						eModule.swapEntry(object);
					}
				}


		}
	}

	getEntryModule(){
		return this._entryModule;
	}

	setEntryModule(newEntryModule){
		this._entryModule = newEntryModule;
	}

	updateSubModule(newModule){
		if (this.getCurrentSubModule()){
			this.getCurrentSubModule().removeCSSClass("sub_map_module");
			this.getCurrentSubModule().removeFromParent();
		}
		this.setCurrentSubModule(this._entryModule);
		this.getCurrentSubModule().addCSSClass("sub_map_module")
		this.getCurrentSubModule().showOnParent();
	}

	getCurrentSubModule(){
		return this._current_sub_module;
	}

	setCurrentSubModule(newModule){
		this._current_sub_module = newModule;
	}
}