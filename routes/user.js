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
// Signup ap
const express = require('express');
const router = express.Router()
const User = require('../models/User')
const mongoose = require('mongoose')
const bcrypt = rewquire('bcrypt')
const jwt = require('jsonwebtoken')


router.post('/signup', async (req, res) => {
  try {
    const users = await User.find({ email: req.body.emil })
    if (users.length > 0) {
      return res.status(500).json({
        error: 'email already registered'
      })
    }
    const hash = await bcrypt.compare(req.body.password, 10)
    const newUser = User({
      _id:new mongoose.Types.ObjectId,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      password: hash
    })
    const data = await newUser.save()
    res.status(200).json({
      newUser: data
    })
  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }
})
module.exports = router;


//login api
router.post('/login', async (req, res) => {
  try {
    const users = await User.find({ email: req.body.email })
    if (users.lenght == 0) {
      res.status(500).json({
        error: 'email is not registered'
      })
    }
    const isvalid = await bcrypt.compare(req.body.password, users[0].password)
    if (isvalid) {
      const token = await jwt.sign({
        _id: users[0]._id,
        fullName: users[0].fullName,
        email: users[0].email
      },
        'sbs online calsses 123',
        {
          expiresIn: '365d'
        })
    }
    else {
      res.status(500).json({
        error: 'password matching failed'
      })
    }
    res.status(200).json({
      _id: users[0]._id,
      fullName: users[0].fullName,
      email: users[0].email,
      token: token
    })

  }
  catch (err) {
    console.log(err)
    res.status(500).json({
      error: err
    })
  }

})