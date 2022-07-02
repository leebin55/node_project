import {ValidationError } from "express-validator";

class ValidationException {
	status:number;
	errors : ValidationError[];
	message : string

	constructor(errors:ValidationError[]){
		console.log("validation exception constructor")
		this.status = 400;
		this.errors = errors
		this.message ='validation_failure'
	}
}

export default ValidationException;