import {User,IUser} from './User'
import bcrypt from 'bcrypt'
import logger from '../utils/logger'
import sequelize from '../config/database'
import { createRandomString } from '../utils/generator'
import { sendMail } from '../email/EmailService'
import {mailSubject} from '../email/shared'
import SendEmailException from '../error/SendEmailException'


const findByEmail = async(email:string)=>{
	return await User.findOne({where :{email}})
}

const saveUser = async(body : IUser)=>{
	const {username, password , email} = body
	const hashedPassword = await bcrypt.hash(password,12)
	const mailToken = createRandomString(16)
	const transaction = await sequelize.transaction()
	await User.create({username, password:hashedPassword,email,mailToken}, {transaction})
	try{
		await sendMail(mailSubject['ACCOUNT ACTIVATION'],email,mailToken)
		await transaction.commit()
	}catch(e){
		logger.error('SaveUser fail and rollback:' ,e)
		await transaction.rollback()
		throw new SendEmailException();
	}

}

export {findByEmail, saveUser}