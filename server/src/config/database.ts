import { Sequelize } from "sequelize-typescript";
import config from 'config';
import { Dialect } from "sequelize/types";
import User from '../user/User'


interface configData {
		database : string,
		username : string,
		password : string ,
		dialect : Dialect ,
		storage? : string
		logging :boolean
	
}

const dbConfig : configData = config.get('database');

console.log(dbConfig)
//new Sequelize(database , username , password ,{dialect , opt...})
 const sequelize = new Sequelize({
	database : dbConfig.database,
	username: dbConfig.username,
	password : dbConfig.password,
	dialect: dbConfig.dialect,
	storage:dbConfig.storage,
	logging : dbConfig.logging
 })

 sequelize.addModels([User])
export default sequelize;