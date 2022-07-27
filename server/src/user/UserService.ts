import User from './User'
import bcrypt from 'bcrypt'
import logger from '../utils/logger'
import sequelize from '../config/database'
import { createRandomString } from '../utils/generator'
import { sendMail } from '../email/EmailService'
import {mailSubject} from '../email/shared'
import SendEmailException from '../error/SendEmailException'
import InvalidTokenException from '../error/InvalidTokenException'


export const findByEmail = async(email:string)=>{
	return await User.findOne({where :{email}})
}

export const saveUser = async(body : User)=>{
	const {username, password , email} = body
	const hashedPassword = await bcrypt.hash(password,12)
	const mailToken = createRandomString(16)
	const transaction = await sequelize.transaction()
	await User.create({username, password:hashedPassword,email,token:mailToken}, {transaction})
	try{
		await sendMail(mailSubject.Activate,email,mailToken)
		await transaction.commit()
	}catch(e){
		logger.error('fail to save the user and rollback:' ,e)
		await transaction.rollback()
		throw new SendEmailException();
	}
}

export const activateUserWithToken= async(token:string)=>{
	const user= await User.findOne({where:{
		token
	}})
	if(!user){
		throw new InvalidTokenException();
	}
	// after activation  remove token  
	user.active=true
	user.token = null; 
	await user.save();
}