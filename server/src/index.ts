import app from './app'
import sequelize from './config/database';
import logger from './utils/logger'

 sequelize.sync({force:true}).then(()=>{
	logger.debug('sequelize connection')
}).catch((e)=>{
	logger.error('db connection fail : ',e)
});

app.listen(8080, ()=>{
	logger.debug('app is running')
}) 