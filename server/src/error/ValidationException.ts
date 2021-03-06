import {ValidationError } from "express-validator";

class ValidationException {
	status:number;
	errors : ValidationError[];
	message : string

	constructor(errors:ValidationError[]){
		this.status = 400;
		this.errors = errors
		this.message ='validation_failure'
	}
}

export default ValidationException;