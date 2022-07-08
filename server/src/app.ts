import { debug } from 'console';
import express from 'express'
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import ErrorHandler from './error/ErrorHandler';
import userRouter from './user/UserRouter'
import blogRouter from './blog/BlogRouter'
import logger from './utils/logger';

i18next
	.use(Backend)
	.use(middleware.LanguageDetector)
	.init({
		debug:true,
		fallbackLng:'kr',
		lng:'kr',
		ns:['translation'],
		defaultNS:'translation',
		backend:{
			loadPath:'./locales/{{lng}}/{{ns}}.json'
		},
		detection:{
			lookupHeader:'accept-language'
		},
		missingKeyHandler:(lng,ns,key)=>{
			logger.error(`MISSING_KEY : ${lng} /${ns}/${key}`)
		}
	})

const app = express();

app.use(middleware.handle(i18next));

app.use(express.json())

app.use('/users',userRouter)
app.use('/blogs',blogRouter)

app.use(ErrorHandler)

export default app;