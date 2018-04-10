// popupController

class popupController {
    constructor() {

    }

    getPopupStylesheet() {
        for (var i = 0; i < document.styleSheets.length; i++) {
        	// Hardcoded the name of the stylesheet - this is an unwanted dependency to fix
            if (document.styleSheets[i].title == "popup_styling") { //if style sheet is titled popup_styling
                return document.styleSheets[i];

            }
        }
    }

    getPopupContent(object) {
        var ret = document.createElement("div");
        ret.classList.add("popup");
        switch (object.constructor.name) {
            case "Entry":
                var textSpan = document.createElement("span");
                // textSpan.classList.add("testLPC");
                var text = object.getDescription();
                textSpan.innerHTML = text + " ";
                var infoCircleSpan = document.createElement("span")
                var infoCircle = document.createElement('i');
                infoCircle.classList.add("fas", "fa-info-circle");
                infoCircleSpan.onclick = function() { object.showEntryModule() };
                infoCircleSpan.appendChild(infoCircle);
                // textSpan.appendChild(infoCircleSpan);
                ret.appendChild(textSpan)
                ret.appendChild(infoCircleSpan);
                // This is currently hardcoded to the popup_styling sheet
                var popupStylesheet = this.getPopupStylesheet();
                popupStylesheet.disabled = false;






                // var pupSSheet = document.getElementById('popup_styling');
                // console.log("popup styling sheet: " + pupSSheet);
                // pupSSheet.disabled = false;

                break;
            default:

                break;
        }
        return ret;
    }

}