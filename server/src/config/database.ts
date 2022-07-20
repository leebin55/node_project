import { Sequelize } from "sequelize-typescript";
import config from 'config';
import { Dialect } from "sequelize/types";
import {User} from '../user/User'


interface IConfig {
		database : string,
		username : string,
		password : string ,
		dialect : Dialect ,
		host:string,
		logging :boolean
	
}

const dbConfig : IConfig = config.get('database');

console.log(dbConfig)
//new Sequelize(database , username , password ,{dialect , opt...})
 const sequelize = new Sequelize({
	database : dbConfig.database,
	username: dbConfig.username,
	password : dbConfig.password,
	dialect:dbConfig.dialect
 })

 sequelize.addModels([User])
export default sequelize;