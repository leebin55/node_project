import User from './User'
import bcrypt from 'bcrypt'
import logger from '../utils/logger'
import config from 'config'
import sequelize from '../config/database'
import { nextTick } from 'process'
import CreateUserException from '../error/CreateUserException'


interface ISaveUserBody{
	username : string
	email : string
	password : string
}

const findByEmail = async(email:string)=>{
	return await User.findOne({where :{email}})
}

const saveUser = async(body : ISaveUserBody)=>{
	const {username, password , email} = body
	const hashedPassword = await bcrypt.hash(password,12)
	const transaction = await sequelize.transaction()
	await User.create({username, password:hashedPassword,email}, {transaction})
	try{
		await transaction.commit()
	}catch(e){
		logger.error('SaveUser fail and rollback:' ,e)
		await transaction.rollback()
		throw new CreateUserException()
	}

}

export {findByEmail, saveUser}