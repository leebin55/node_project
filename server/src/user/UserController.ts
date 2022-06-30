import {RequestHandler} from 'express'
import logger from '../utils/logger'
import User from './User'
import * as UserService from './UserService'


const joinUser:RequestHandler = async(req,res,next)=>{
	try{
		await UserService.saveUser(req.body)
		return res.status(200).send();
	}catch(error){
		logger.error(error)
	}
}

export {joinUser}