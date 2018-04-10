// summaryObject - contains basic information 

class summaryObject {
    constructor(requiredFields, optionalFields) {
        this.setRequiredFields(requiredFields);
        this.setOptionalFields(optionalFields);
    }

    setRequiredFields(requiredFieldsObject) {
        this._requiredFields = requiredFieldsObject;
    }

    getRequiredFields() {
        return this._requiredFields;
    }

    setOptionalFields(optionalFields) {
        this._optionalFields = optionalFields;
    }

    getOptionalFields() {
        return this._optionalFields;
    }

    // Will overwrite existing data if the fieldName is already in use
    addRequiredField(fieldName, fieldValue) {
        var reqF = this.getRequiredFields();
        reqF[fieldName] = fieldValue;
    }

    // Will overwrite existing data if the fieldName is already in use
    addOptionalField(fieldName, fieldValue) {
        var optF = this.getOptionalFields();
        optF[fieldName] = fieldValue;
    }

    getAllFieldGroups(){
    	return {"0": this.getRequiredFields(), "1": this.getOptionalFields()};
    }



    load() {

    }

    save() {

    }
}