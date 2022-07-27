import nodemailer from 'nodemailer';
import {transporter}  from '../config/transporter'
import logger from '../utils/logger';
import { mailSubject } from './shared';



export const sendMail =async(subject:string,email:string,token:string)=>{

	let path ='activate/'
	let msg = 'activate your account'

	if(subject === mailSubject.Reset){
		path = 'password-reset/'
		msg = 'reset your password'
	}

	const info = await transporter.sendMail({
		from:'Node Application <info@app.com>',
		to : email,
		subject:subject.toString(),
		html:`
		<div>
  		<h3>Please click below link to ${msg}</h3>
  	  </div>
  	  <div>
  		<a href="http://localhost:8080/users/${path}${token}">${subject}</a>
  	  </div>
		`
	})

	if (process.env.NODE_ENV === 'development') {
		// dev => ethereal email 을 이용하여 메일을 확인하기 위해 url 필요
		logger.info('mail url: ' + nodemailer.getTestMessageUrl(info));
	  }
}

