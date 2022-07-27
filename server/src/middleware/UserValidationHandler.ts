import {Request, Response , NextFunction} from 'express'
import {validationResult} from 'express-validator'
import ValidationException from '../error/ValidationException'

 const userValidationHandler=(req:Request,res:Response , next:NextFunction)=>{
	const errors = validationResult(req)
	if(!errors.isEmpty()){
		console.log("확인 :",errors)
		return next(new ValidationException(errors.array()))
	}
	next();
}

export default userValidationHandler;