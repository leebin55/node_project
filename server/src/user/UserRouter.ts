import {Router} from 'express';
import userValidationHandler from '../middleware/UserValidationHandler';
import * as UserController from './UserController'
import {UserJoinValidator} from '../utils/validator'

const router = Router();

router.post('/',UserJoinValidator(),userValidationHandler,UserController.joinUser)

router.get('/')

router.patch('/:id')

router.delete('/:id')

router.get('/activate/:token',UserController.activateAccount)
export default router;