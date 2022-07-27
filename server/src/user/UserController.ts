import {RequestHandler} from 'express'
import * as UserService from './UserService'


export const joinUser:RequestHandler = async(req,res,next)=>{
	try{
		await UserService.saveUser(req.body)
		return res.send({ message: req.t('user_create_success') });
	}catch(error){
		next(error)
	}
}

export const activateAccount:RequestHandler =async(req,res,next) => {
	try{
		await UserService.activateUserWithToken(req.params.token)
		return res.send({message:req.t('account_activation_success')})
	}catch(e){
		next(e)
	}
}
