import User from './User'
import bcrypt from 'bcrypt'
import logger from '../utils/logger'

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
	try{
		User.create({username, password,email})
	}catch(e){
		logger.error('SaveUser fail')
	}

}

export {findByEmail, saveUser}