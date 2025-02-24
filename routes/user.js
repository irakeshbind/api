
// Signup ap
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cloudinary = require('cloudinary').v2
require('dotenv').config()

  
  cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,
    api_secret: process.env.SECRECT_KEY 
});
router.post('/signup', async (req, res) => {
  
  
  try {
   const uploadedImage = await cloudinary.uploader.upload(req.files.photo.tempFilePath)
  
    const users = await User.find({ email: req.body.email });
    if (users.length > 0) {
      return res.status(409).json({
        error: 'Email is already registered',
      });
    }

    const hashCode = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      // address: req.body.address,
      imageUrl:uploadedImage.secure_url,
      imageId:uploadedImage.public_id,
      password: hashCode,
    });
    const data = await newUser.save();
    res.status(201).json({
      newUser: data,
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
});

module.exports = router;



//login api
// router.post('/login', async (req, res) => {
//   try {

//     const users = await User.find({ email: req.body.email });
//     if (users.length === 0) {
//       return res.status(500).json({
//         error: 'Email is not registered'
//       });
//     }
//     const isValid = await bcrypt.compare(req.body.password, users[0].password);
//     if (!isValid) {
//       return res.status(500).json({
//         error: 'Password matching failed'
//       });
//     }

//     const token = await jwt.sign({
//       _id: users[0]._id,
//       fullName: users[0].fullName,
//       email: users[0].email
//     }, 'sbs online classes 123', {
//       expiresIn: '365d'
//     });
//     return res.status(200).json({
//       _id: users[0]._id,
//       fullName: users[0].fullName,
//       email: users[0].email,
//       token: token
//     });
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json({
//       error: err
//     });
//   }
// });
