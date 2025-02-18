// const express = require('express');
// const router = express.Router()
// const User = require('../models/User')
// const mongoose =require('mongoose')

// router.post('/signup',(req,res)=>{
//     const newUser =  User({
//         fullName:req.body.fullName,
//         email:req.body.email,
//         phone:req.body.phone,
//         addess:req.body.address,
//         password:req.body.password
//     }) 
//      newUser.save()
//     .then(result=>{
//         res.status(200).json({
//                newUser:result
//         })
//     })
//     .catch(err)
//     {
//         console.log(err)
//         res.status(500).json({
//             error:err
//         })
//     }
// })

// // ====
// bcrypt.hash(req.body.password,10,(err,hash)=>{
//     if(err)
//     {
//         return res.status(500).json({
//             error:err
//         })
//     }
// })
// // =============

// User.find({email:req.body.email})
// .then(user=>{
//     if(user.lenght>0)
//     {
//         error:"email all exist"
//     }
// })
// .catch(err)
// {
//     console.log(err)
//     res.status(500).json({
//         error:err
//     })
// }
// module.exports = router;



// ==========================async await ============
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const mongoose =require('mongoose')

router.post('/signup',async,(req,res)=>{
  try{
    const newUser = await User({
        fullName:req.body.fullName, 
        email:req.body.email,
        phone:req.body.phone,
        addess:req.body.address,
        password:req.body.password
   })
   const data = await newUser.save()
   res.status(200).json({
       newUser:data
   })
  }
  catch(err){
    console.log(err)
    res.status(500).json({
        error:err
    })
  }
})
module.exports = router;
