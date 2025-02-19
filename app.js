const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const mongoose =require('mongoose')
const userRoute = require('./routes/user')

const connectWithDatabase =async()=>{
    try{
    const res = await mongoose.connect('mongodb+srv://12:12@cluster0.kwtl9.mongodb.net/')
    console.log('connected with database')
    }
    catch(err){
      console.log(err)
    }
}
connectWithDatabase()
app.use(bodyParser.json())
app.use('/user',userRoute)

module.exports =app