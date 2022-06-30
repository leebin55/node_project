import {Router} from 'express';
import userValidationHandler from '../middleware/UserValidationHandler';
import * as UserController from './UserController'
// import {check , validationResult} from 'express-validator'
import UserValidator from './validator'

const router = Router();

router.post('/',UserController.joinUser)

router.get('/')

router.patch('/:id')

router.delete('/:id')

export default router;