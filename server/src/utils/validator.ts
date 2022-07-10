import {check} from 'express-validator';
import {findByEmail} from '../user/UserService'


const UserValidator=()=>{
	return[
		check('username')
		.notEmpty()
		.withMessage('username_null')
		.bail()
		.isLength({min:4 , max : 32})
		.withMessage('username_length')
		.bail()
		.matches(/^[a-zA-Z0-9]*$/)
		.withMessage('username_pattern'),
	  check('email')
		.notEmpty()
		.withMessage('email_null')
		.bail()
		.isEmail()
		.withMessage('email_invalid')
		.bail()
		.custom(async(email)=>{
			const user = await findByEmail(email)
			if(user)throw new Error('email_in_use')
		})
		,
	  check('password')
		.notEmpty()
		.withMessage('password_null')
		.bail()
		.isLength({min:6})
		.withMessage('password_length')
		.bail()
		.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
		.withMessage('password_pattern')
	]	
}

const postValidator=()=>{
	
}
export { UserValidator};