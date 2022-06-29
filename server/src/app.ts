import express from 'express'
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';
import todoRouter from './todo/TodoRouter'
import userRouter from './user/UserRouter'

i18next.use(Backend)
	.use(middleware.LanguageDetector)
	.init({
		fallbackLng:'kr',
		lng:'kr',
		ns:['translation'],
		defaultNS:'translation',
		backend:{
			loadPath:'../locales/{{lng}}/{{ns}}.json'
		},
		detection:{
			lookupHeader:'accept-language'
		}
	})

	
const app = express();

app.use(express.json())
// app.use(json())
app.use('/todos',todoRouter)
app.use('/users',userRouter)


export default app;