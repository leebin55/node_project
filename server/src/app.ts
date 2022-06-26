import express from 'express'
// import {json} from 'body-parser'
import todoRouter from './todo/TodoRouter'
import userRouter from './user/UserRouter'

const app = express();

app.use(express.json())
// app.use(json())
app.use('/todos',todoRouter)
app.use('/users',userRouter)

app.listen(8080)

export default app;