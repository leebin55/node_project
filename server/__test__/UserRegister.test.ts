import request from 'supertest';
import app from '../src/app'
import kr from '../locales/kr/translation.json'
import en from '../locales/en/translation.json'
import sequelize from '../src/config/database';
import User from '../src/user/User';

beforeAll(async()=>{
	await sequelize.sync()
})

beforeEach(async()=>{
	User.destroy({
		truncate:true
	})
})
afterAll(async()=>{

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
	language : string;
}

const postUser = (user:userType = validUser, options :optionType|null = null)=>{
	const agent = request(app).post('/users/')
	if(options && options.language){
		agent.set('Accept-Language', options.language)
	}
	return agent.send(user)
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

	it(' automatically saves inactive : true when user join ', async()=>{
		 await postUser();
		 const findUser = await User.findOne({where:{
			email:validUser.email
		 }})
		expect(findUser.inactive).toBe(true);
	})

	it('must saves hashed password in db', async()=>{
		await postUser();
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