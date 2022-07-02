import {Router} from 'express';
import userValidationHandler from '../middleware/UserValidationHandler';
import * as UserController from './UserController'
import {UserValidator} from '../utils/validator'

const router = Router();

router.post('/',UserValidator(),userValidationHandler,UserController.joinUser)

router.get('/')

router.patch('/:id')

router.delete('/:id')

export default router;