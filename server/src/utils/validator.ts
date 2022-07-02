import {check} from 'express-validator';
import {findByEmail} from '../user/UserService'
import logger from './logger';

const UserValidator=()=>{
	console.log("user validator execute");
	return[
		check('username')
		.notEmpty()
		.withMessage('username_null'),
	  check('email')
		.notEmpty()
		.withMessage('email_null')
		,
	  check('password')
		.notEmpty()
		.withMessage('password_null')
	]	
}

const postValidator=()=>{
	
}
export { UserValidator};