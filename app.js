const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const mongoose =require('mongoose')
const userRoute = require('./routes/user')
const fileUpload = require('express-fileupload');

const connectWithDatabase =async()=>{
    try{
    const res = await mongoose.connect('mongodb+srv://rakesh:123@cluster0.lydcv.mongodb.net/')
    console.log('connected with database')
    }
    catch(err){
      console.log(err)
    }
}
connectWithDatabase()
app.use(fileUpload({
  useTempFiles : true,
 
}));
app.use(bodyParser.json())
app.use('/user',userRoute)

module.exports =app