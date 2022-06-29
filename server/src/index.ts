import app from './app'
import sequelize from './config/database';
import logger from './shared/logger'

sequelize.sync().then(()=>{
	console.log('sequelize connection')
}).catch((e)=>{
	console.log('db connection fail : ',e)
});

app.listen(8080,()=>{
	logger.info('app is running')
}) 