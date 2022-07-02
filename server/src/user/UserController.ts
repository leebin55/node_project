import {RequestHandler} from 'express'
import logger from '../utils/logger'
import * as UserService from './UserService'


const joinUser:RequestHandler = async(req,res,next)=>{
	try{
		await UserService.saveUser(req.body)
		return res.send({ message: req.t('user_create_success') });
	}catch(error){
		logger.error(error)
	}
}

export {joinUser}