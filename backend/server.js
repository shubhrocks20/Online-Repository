import express from 'express'
import router from './routes/code.route.js';
import dotenv from 'dotenv'
dotenv.config()
import redis from 'redis'

import cors from 'cors';
import mongoose from 'mongoose';
import ErrorHandling from './middlewares/ErrorHandling.js';


const app = express()
// const redisClient = redis.createClient({ url: 'redis-11176.c325.us-east-1-4.ec2.cloud.redislabs.com' });
// await redisClient.connect();


app.use(cors());
app.use(express.json())
app.use('/api', router);
app.get('/', (req, res)=>{
    res.json('OK')
})
mongoose.connect(`${process.env.MONGO_URI}`)
.then(()=>console.log(`Mongo Db Connected Successfully!`))
.catch((err)=>console.error('Error while Connecting to Mongo:', err))
app.use(ErrorHandling);
app.listen(process.env.PORT, ()=>console.log(`Listening on PORT:${process.env.PORT}`))