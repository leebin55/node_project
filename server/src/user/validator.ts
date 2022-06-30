import {check} from 'express-validator';
import {findByEmail} from './UserService'

class UserValidator{
	checkJoinUser(){
		return[
			check('username')
			.notEmpty()
			.withMessage('username_null')
			.bail() 
			.isLength({ min: 4, max: 32 })
			.withMessage('username_size'),
		  check('email')
			.notEmpty()
			.withMessage('email_null')
			.bail()
			.isEmail()
			.withMessage('email_invalid')
			.bail()
			.custom(async (email) => {
			  const user = await findByEmail(email);
			  if (user) {
				throw new Error('email_inuse');
			  }
			}),
		  check('password')
			.notEmpty()
			.withMessage('password_null')
			.bail()
			.isLength({ min: 6 })
			.withMessage('password_size')
			.bail()
			.matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/)
			.withMessage('password_pattern')
		]
	}
}

export default new UserValidator;