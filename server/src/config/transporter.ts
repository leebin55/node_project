import nodemailer from 'nodemailer'
import config from 'config'

interface IConfig {
	host:string,
	port:number,
	auth?:{
		user:string,
		pass:string,
	},
	tls?:{
		rejectUnauthorized:false
	}
}

const mailConfig:IConfig = config.get('mail')

export const transporter = nodemailer.createTransport({...mailConfig})