// PCT Snapshot Summary Module

console.log("Summary module loaded");

class summaryModule extends generalModule {
	constructor(object, parent) {
		super(object, parent);
	}

	createPanesRow(numPanes){
		var panesRow = this.createElement('div');
		panesRow.classList.add('row');
		panesRow.style.display = "flex";
		// panesRow.style.margin = "0px";
		return panesRow;
	}

	// No error checking right now; width <=12 to comply with Bootstrap 
	createPane(width){
		var newPane = this.createElement('div');
		newPane.classList.add('col-xs-'+width);
		// newPane.style.overflow = "auto";
		// newPane.style.padding = "0px";
		var wPct = 100*width/12;
		// newPane.style.width = wPct+"%";
		return newPane;

	}

	createPanes(numberOfPanes){
		var averageSpan = Math.floor(12/numberOfPanes);
		var extraSpan = 12-numberOfPanes*averageSpan;
		var panes = {};
		for (var i =0; i<numberOfPanes; i++){
			console.log("creating pane"+ i);
			var len = averageSpan+(i==0)*extraSpan;
			console.log("len = "+len);
			var paneField = 'pane'+i;
			var newpane = this.createPane(len);
			if (i!=numberOfPanes-1){
				newpane.style.borderRight = "solid black 1px";
			}
			panes[paneField] = newpane;
		}
		return panes;
	}

	populatePane(pane, data, options){
		var myList = this.makeUnorderedList();

		for (var key in data){
			var value = data[key];
			switch (value.constructor.name){
				case "String":
					this.addListItem(myList, this.makeStringListItem(key, value));
					break;
				case "Number":
					this.addListItem(myList, this.makeNumberListItem(key, value));
					break;
				case "Boolean":
					// Some logic
					break;
				case "Entry":
					// some logic
					break;
				default:
					//some logic
					break;
			}
		}

		pane.appendChild(myList);

	}

	makeUnorderedList(){
		return this.createElement('ul');
	}

	makeStringListItem(key, value){
		var p = this.createElement('span');
		p.innerHTML = key + ": " + value;
		return p;
	}

	makeNumberListItem(key, number){
		var p = this.createElement('span');
		p.innerHTML = key +": " + number;
		return p;
	}

	addListItem(list, itemDom){
		var li = this.createElement("li");
		li.appendChild(itemDom);
		list.appendChild(li);
	}





	setSummaryObject(object){
		this._summaryObject = object;
	}

	getSummaryObject(){
		return this._summaryObject;
	}


	fillContainer() {
		var fieldGroups = this.getSummaryObject().getAllFieldGroups();
		console.log(fieldGroups);
		var numberPanes = Object.keys(fieldGroups).length;
		var panesRow = this.createPanesRow();
		var panes = this.createPanes(numberPanes);
		for (var i = 0; i<numberPanes;i++){
			var paneField = "pane"+i;
			this.populatePane(panes[paneField], fieldGroups[''+i]);
			panesRow.append(panes[paneField]);
		}
		this._container.appendChild(panesRow);

	}

	acceptObject(object){
		if (object.constructor.name == "summaryObject"){
			this.setSummaryObject(object);
		} else {
			console.error("Trying to make summaryModule but not with summaryObject");
		}

	}

}