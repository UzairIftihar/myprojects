const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const bcryptjs = require('bcryptjs');
const {Users,regvalidate,loginvalidate} = require('../models/Users');


router.get("/",(req,res)=>{
   res.send("Hello users api");
});

router.post('/register',(req,res)=>{
  const {error} = regvalidate(req.body);
  if(error){
     return res.status(400).json({
   status:'error',
   type:error.details[0].path[0],
   msg:error.details[0].message
     });
  }

  const newUser = new Users({
     username:req.body.username,
     email:req.body.email,
     password:req.body.password
  }); 
  Users.findOne({email:req.body.email}).then(emailMatch =>{
  if(emailMatch){
    return res.status(400).json({
   status:'error',
   type:'email',
   msg:'email is already registered'
    });
  }
  Users.findOne({username:req.body.username}).then(username=>{
  if(username){
    return res.status(400).json({
    status:'error',
    type:'username',
    msg:'username is already registered'
    });
  }   

  bcryptjs.genSalt(10,(err,salt)=>{
   bcryptjs.hash(newUser.password,salt,(err,hash)=>{
   if(err) throw err;
    newUser.password = hash;
  newUser
  .save()
  .then(post=>res.json(post))
  .catch(err=>console.error(err));
  });
  });
});
  });
});
router.post('/login',(req,res)=>{
  const {error} = loginvalidate(req.body);
  if(error){
     return res.status(400).json({
   status:'error',
   type:error.details[0].path[0],
   msg:error.details[0].message
     });
  } 
   
Users.findOne({email:req.body.email}).then(user=>{
  if(!user){
    return res.status(400).json({
      status:'error',
      type:'email',
      msg:'email is not registred'
    });
  }

bcryptjs.compare(req.body.password,user.password).then(isMatch=>{
if(isMatch){
  const payload = {
    id:user.id,
    username:user.username,
    email:user.email
  };

jwt.sign(payload,keys.secretkey,{expiresIn:3600},(err,token)=>{
 res.json({
    sucess:true,
    token:"baerer" + token
 });
});

}else{
  return res.status(400).json({
    status:'error',
    type:'password',
    msg:'Password is incorrect'
  });
}
});

});

});
module.exports = router;
