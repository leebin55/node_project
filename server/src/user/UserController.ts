import {RequestHandler} from 'express'
import logger from '../utils/logger'
import * as UserService from './UserService'


export const joinUser:RequestHandler = async(req,res,next)=>{
	console.log("user create : ", req)
	try{
		await UserService.saveUser(req.body)
		return res.send({ message: req.t('user_create_success') });
	}catch(error){
		next(error)
	}
}
