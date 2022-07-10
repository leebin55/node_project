class CreateUserException {
	status:number;
	message : string

	constructor(){
		this.status = 503;
		this.message ='user_create_fail'
	}
}

export default CreateUserException;