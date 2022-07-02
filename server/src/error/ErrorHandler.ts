import {NextFunction, Request,Response} from 'express'
import {ValidationError } from "express-validator";


interface IError{
	status:number,
	message : string,
	errors?:ValidationError[]
}

interface IValidation{
	username?:string,
	password?:string
}

const ErrorHandler=(err:IError, req:Request, res:Response, next:NextFunction)=>{

	const {status , message , errors} = err;
	const validationErrors :Record<string,string> ={}

	if(errors){
		errors.forEach((err)=>{
			console.log("hey : " ,err)
			validationErrors[err.param] = req.t(err.msg)
		})
	}

	res.status(status).send({
		path:req.originalUrl,
		timestamp: new Date().getDate(),
		message:req.t(message),
		validationErrors
	})
}

export default ErrorHandler;