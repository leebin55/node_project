import request from 'supertest';
import app from '../src/app'

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

	it('returns 회원가입 완료 message when signup request is valid',async()=>{
		const response = await postUser();
		expect(response.body.message).toBe('회원가입 완료')
	})
	it.each([
		['username', '이름은 반드시 입력하셔야 합니다.'],
		['email', '이메일은 반드시 입력하셔야 합니다.'],
		['password', '비밀번호는 반드시 입력하셔야 합니다.'],
	  ])('when %s is null message [ %s ] is received', async (field, expectedMessage) => {
		const userWithNull = {...validUser};
		userWithNull[field as keyof userType] = null
		const response = await postUser(userWithNull);
		const body = response.body;
		expect(body.validationErrors[field]).toBe(expectedMessage);
	  });
})