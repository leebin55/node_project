import nodemailer from 'nodemailer';
import {transporter}  from '../config/transporter'
import logger from '../utils/logger';
import { mailSubject } from './shared';



export const sendMail =async(subject:mailSubject,email:string,token:string)=>{

	let path ='login?token'

	if(subject === mailSubject['PASSWORD RESET']){
		path = 'password-reset?reset'
	}

	const info = await transporter.sendMail({
		from:'Node Application <info@app.com>',
		to : email,
		subject:subject.toString(),
		html:`
		<div>
  		<b>Please click below link to reset your password</b>
  	  </div>
  	  <div>
  		<a href="http://localhost:8080/#/${path}=${token}">${subject}</a>
  	  </div>
		`
	})
	if (process.env.NODE_ENV === 'development') {
		logger.info('url: ' + nodemailer.getTestMessageUrl(info));
	  }
}

