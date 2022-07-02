import {Request, Response , NextFunction} from 'express'
import {validationResult} from 'express-validator'
import ValidationException from '../error/ValidationException'
import logger from '../utils/logger'

 const userValidationHandler=(req:Request,res:Response , next:NextFunction)=>{
	console.log("UserValidation Handler :", req.body)
	const errors = validationResult(req)
	if(!errors.isEmpty()){
		console.log("validator error :", errors)
		return next(new ValidationException(errors.array()))
	}
	next();
}

export default userValidationHandler;