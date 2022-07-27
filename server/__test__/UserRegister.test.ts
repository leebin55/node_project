import request from 'supertest';
import app from '../src/app'
import kr from '../locales/kr/translation.json'
import en from '../locales/en/translation.json'
import sequelize from '../src/config/database';
import User from '../src/user/User';
import {SMTPServer} from 'smtp-server'
import config from 'config'

let server:SMTPServer, lastMail;
let smtpFailure = false; // true => sending email fails

interface IError extends Error{
	responseCode?:number
}

beforeAll(async()=>{

	server = new SMTPServer({
		authOptional:true,
		onData(stream, session, callback){
			let mailBody : String;
			stream.on('data',(data)=>{
				mailBody += data.toString()
			})
			stream.on('end',()=>{
				if(smtpFailure){
					const err: IError = new Error('Invalid mailBox')
					err.responseCode = 553;
					return callback(err)
				}
				lastMail = mailBody;
				callback();//done
			})
		}
	})

	const  mailData :{port:number}= config.get('mail')
	await server.listen(mailData.port ,'localhost')
	if(process.env.NODE_ENV==='test'){
		await sequelize.sync()
	}
	jest.setTimeout(20000);
})

beforeEach(async()=>{
	smtpFailure = false; 
	await User.destroy({
		truncate:true
	})
})
afterAll(async()=>{
	await server.close()
	jest.setTimeout(5000)
})
const validUser ={
	username :"user01",
	email: "user01@email.com",
	password:"Abc0101"
}
type userType = {
	username : string,
	email:string,
	password:string,
}

type optionType={
	language : string | null;
}

const postUser = (user:userType = validUser, options :optionType = null)=>{
	const agent = request(app).post('/users/')
	if(options && options.language){
		agent.set('Accept-Language', options.language)
	}
	return agent.send(user)
}

const postAndFindUser =async(user:userType = validUser)=>{
	await postUser(user);
	return await User.findOne({where:{
		email:user.email
	 }})
}

describe('User Registration Test',()=>{
	it('returns 200 when signup request is valid', async()=>{
		const response = await postUser();
		expect(response.status).toBe(200)
	})

	it('returns success message when signup request is valid',async()=>{
		const response = await postUser();
		expect(response.body.message).toBe(kr.user_create_success)
	})

	it('must saves hashed password in db', async()=>{
		const response = await postUser();
		const findUser=await User.findOne({where:{
			email:validUser.email
		}})

		expect(findUser.password).not.toBe(validUser.password);
	})

	
})

describe('User Join Validation Fail Test',()=>{
	it.each`
	field | message | language | value
	${'username'}|${kr.username_null}|${'kr'}|${null}
	${'username'}|${kr.username_length}|${'kr'}|${'aaa'}
	${'username'}|${kr.username_length}|${'kr'}|${'a'.repeat(33)}
	${'username'}|${kr.username_pattern}|${'kr'}|${'aaa안녕'}
	${'username'}|${kr.username_pattern}|${'kr'}|${'a   aa'}
	${'username'}|${kr.username_pattern}|${'kr'}|${'a----aa'}
	${'username'}|${kr.username_pattern}|${'kr'}|${'aaa!!'}
	${'username'}|${en.username_null}|${'en'}|${null}
	${'username'}|${en.username_length}|${'en'}|${'aaa'}
	${'username'}|${en.username_length}|${'en'}|${'a'.repeat(33)}
	${'username'}|${en.username_pattern}|${'en'}|${'aaa안녕'}
	${'username'}|${en.username_pattern}|${'en'}|${'a   aa'}
	${'username'}|${en.username_pattern}|${'en'}|${'a----aa'}
	${'username'}|${en.username_pattern}|${'en'}|${'aaa!!'}
	${'password'}|${kr.password_null}|${'kr'}|${null}
	${'password'}|${kr.password_length}|${'kr'}|${'a'.repeat(5)}
	${'password'}|${kr.password_pattern}|${'kr'}|${'a12344'}
	${'password'}|${kr.password_pattern}|${'kr'}|${'AAA12344'}
	${'password'}|${kr.password_pattern}|${'kr'}|${'aAAEadasd'}
	${'password'}|${kr.password_pattern}|${'kr'}|${'A12344!!'}
	${'password'}|${kr.password_pattern}|${'kr'}|${'한글한글한글'}
	${'password'}|${en.password_null}|${'en'}|${null}
	${'password'}|${en.password_length}|${'en'}|${'a'.repeat(5)}
	${'password'}|${en.password_pattern}|${'en'}|${'a12344'}
	${'password'}|${en.password_pattern}|${'en'}|${'AAA12344'}
	${'password'}|${en.password_pattern}|${'en'}|${'aAAEadasd'}
	${'password'}|${en.password_pattern}|${'en'}|${'A12344!!'}
	${'password'}|${en.password_pattern}|${'en'}|${'한글한글한글'}
	${'email'}|${kr.email_null}|${'kr'}|${null}
	${'email'}|${kr.email_invalid}|${'kr'}|${'AAA12344'}
	${'email'}|${kr.email_invalid}|${'kr'}|${'이메일'}
	${'email'}|${kr.email_invalid}|${'kr'}|${'이메일@.com'}
	${'email'}|${kr.email_invalid}|${'kr'}|${'AAA12344@@'}
	${'email'}|${kr.email_invalid}|${'kr'}|${'11'}
	${'email'}|${en.email_null}|${'en'}|${null}
	${'email'}|${en.email_invalid}|${'en'}|${'AAA12344'}
	${'email'}|${en.email_invalid}|${'en'}|${'이메일'}	
	${'email'}|${en.email_invalid}|${'en'}|${'이메일.com'}
	${'email'}|${en.email_invalid}|${'en'}|${'AAA12344@@'}
	${'email'}|${en.email_invalid}|${'en'}|${'11'}
	`('returns $message when value of field is $value and language is set as $language',async({field,message,language,value})=>{
		const user = {...validUser}
		user[field as keyof userType] = value
		const response = await postUser(user,{language})
		expect(response.body.validationErrors[field]).toBe(message)
	})

	it(`returns status 400 when the email is already in use `,async()=>{
		await User.create({...validUser})
		const response = await postUser()
		expect(response.status).toBe(400)
	} )
	
	it(`returns [ ${kr.email_in_use} ] message when the email is already in use when language is set as korean `,async()=>{
		await User.create({...validUser})
		const response = await postUser()
		expect(response.body.validationErrors.email).toBe(kr.email_in_use)
	} )

})

describe('Account activation Test',()=>{
	it(' saves [active : false]  by default whenever a user joins', async()=>{
		const findUser = await postAndFindUser();
	   expect(findUser.active).toBe(false);
   })

   it(' is still inactivated user if there is request body with active as true(Using token is only way to activate the user)',async()=>{
	const inactivatedUser = {...validUser,active:true}
	 const findUser = await postAndFindUser(inactivatedUser)
	expect(findUser.active).toBe(false)
   })
   
  
  
	it('creates token for user activation when signup request is valid and stores token in DB' ,async()=>{
		const token = (await postAndFindUser()).token
		expect(token.length).toBe(16)
	})

	it('returns 502 Bad Gateway when sending email fails', async()=>{
		// trick : in case smtp server fail 
		smtpFailure = true; 
		const res = await postUser()
		expect(res.status).toBe(502)
	})

	it('returns Email failure when sending email fails',async()=>{
		smtpFailure = true;
		const res = await postUser()
		expect(res.body.message).toBe(kr.email_send_failure)
	})

	it('does not save user to db if activation email fails',async()=>{
		smtpFailure = true;
		const user = await postAndFindUser()
		expect(user).toBe(null)
	})

	it('returns Email failure message in error response body when validation fails',async () => {
		const response = await postUser({
			username: null,
			email: validUser.email,
			password: validUser.password,
		  });
		  expect(response.body.message).toBe(kr.validation_failure);
	})

	it('activates the account [active = true] when correct token is sent from email ',async()=>{
		let user = await postAndFindUser();
		const token = user.token
		await request(app).get('/users/activate/'+token)
		user = await User.findOne({where: {email:validUser.email}})
		expect(user.active).toBe(true);

	   })

	   it(' removes token in DB when activating user is success',async()=>{
		let user = await postAndFindUser();
		const token = user.token
		await request(app).get('/users/activate/'+token)
		user = await User.findOne({where: {email:validUser.email}})
		expect(user.token).toBe(null);
	   })

	   it(`returns message [${kr.account_activation_success} ] when activating user is success`,async()=>{
		const user = await postAndFindUser()
		const token = user.token
		const res =await request(app).get('/users/activate/'+token)
		expect(res.body.message).toBe(kr.account_activation_success);
	
	   })
})