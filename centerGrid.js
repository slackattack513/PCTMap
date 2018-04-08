class mapArrayCell {

    constructor(options) {

    }

}

function makeEmptyDiv() {
    var div = document.createElement('div');
    return div;
}

class mainArray {
    // options = {"data": GeoJSON Object, "file": JSON_file_to_load, "map": Map Object to add this layer to, "style": {style of layer}}
    constructor(options) {
        this._options = options;
        this.addData(options.data ? options.data : function() { return options.file ? loadGEOJSON(options.file) : undefined });
        console.log(this.getData());
        this.makeLayer();
        this.updateMap();
    }

    getNumberOfRows() {
        return this._rows.length;
    }

    getNumberOfColumns() {
        return this._columns.length;
    }

    setRows(rows) {
        var newArray = [];
       for (int i = 0; i < rows; i++) {
       	if (i > this._rows) {
       		var newRow = makeEmptyDiv();
       		newRow.id = "mainArrayRow"+i;
       		
       	}
        for (int j = 0; j < columns; i++) {

                if (i > this._rows) {
                    var newDivElem = makeEmptyDiv();
                    newDivElem.id = "row" + i + "col" + j + "div";
                    newArray[i][j] = newDivElem;
                } else {
                    newArray[i][j] = this._array[i][j];
                }
            }
        }
        if (rows < this._rows) {
            for (int j = rows; j < this._rows; j++) {
                for (int k = 0; k < this._columns; k++) {
                    var extraDOM = this._array[j][k];
                    extraDOM.parentNode.removeChild(extraDOM);
                }
            }
        }
        this._array = newArray;
        this._rows = rows;
    }

    setColumns(columns) {

        var newArray = [];
        for (int i = 0; i < this._rows; i++) {
            for (int j = 0; j < columns; i++) {

                if (columns > this._columns) {
                    var newDivElem = makeEmptyDiv();
                    newDivElem.id = "row" + i + "col" + j + "div";
                    newArray[i][j] = newDivElem;
                } else {
                    newArray[i][j] = this._array[i][j];
                }
            }
        }

        if (columns < this._columns) {
            for (int j = columns; j < this._columns; j++) {
                for (int k = 0; k < this._rows; k++) {
                    var extraDOM = this._array[k][j];
                    extraDOM.parentNode.removeChild(extraDOM);
                }
            }
        }

        this._array = newArray;
        this._columns = columns;
    }

    // module - DOM element to be added, row, col
    addModule(module, row, col) {
        if (row > this.getNumberofRows()) {
            this.setRows(row);
        }

        if (col > this.getNumberofColumns()) {
            this.setColumns(col);
        }

        this._array[row][col] = module;
        document.getElementById("mainArray").children[row - 1].children[col - 1].appendChild(module);

    }

}