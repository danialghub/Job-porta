import './config/instrument.js'
import express from 'express'
import * as Sentry from '@sentry/node'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import { clerkWebHooks } from './controller/webhooks.js'

//Initialize express
const app = express()
//connect to db
await connectDB()

//Middlewares 
app.use(cors())
app.use(express.json())


//Routes
app.get('/', (req, res) => {
    res.send('API working')
})
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});
app.post('/webhooks', clerkWebHooks)




Sentry.setupExpressErrorHandler(app)
//Port
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`server is running on ${port}`);

})