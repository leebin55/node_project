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
	const agent = request(app).post('/users')
	if(options && options.language){
		agent.set('Accept-Language', options.language)
	}
	return agent.send(user)
}

describe('User Registration!!',()=>{
	it('returns 200 when signup request is valid', async()=>{
		const response = await postUser();
		expect(response.status).toBe(200)
	})
})