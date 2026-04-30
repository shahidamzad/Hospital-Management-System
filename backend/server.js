import express from 'express'
import ConnectDb from './config/db.js'
import cors from 'cors'
import 'dotenv/config'
import { config } from 'dotenv'
import connectCloudinary from './config/cloudinary.js'


// app config
const app = express() 
const port = process.env.PORT || 4000
ConnectDb()
connectCloudinary()


// middleware 
app.use(express.json())
app.use(cors())

// api endpoint 
app.get('/',(req,res)=>{
    res.send('api Working')
})

app.listen(port,()=> console.log('server is running',port))

