class  SendEmailException{
	status:number;
	message : string

	constructor(){
		this.status = 502;
		this.message ='email_send_failure'
	}
}

export default SendEmailException;