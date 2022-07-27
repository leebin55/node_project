class  InvalidTokenException{
	status:number;
	message : string

	constructor(){
		this.status = 400;
		this.message ='account_activation_failure'
	}
}

export default InvalidTokenException;