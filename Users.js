const mongoose = require('mongoose');
const Joi = require('joi');
const userschema = new mongoose.Schema({
username:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
date:{
    type:Date,
    default:Date.now()
}
});

const Users = new mongoose.model("users",userschema);
function registrationValidation(user){
    const schema = {
        username:Joi.string()
        .min(3)
        .max(30)
        .required(),
        email:Joi.string()
        .email()
        .required(),
        password:Joi.string().required()
    };
    return Joi.validate(user,schema);
    
}
function loginnValidation(user){
    const schema = {
        
        email:Joi.string()
        .email()
        .required(),
        password:Joi.string().required()
    };
    return Joi.validate(user,schema);
    
}
exports.Users = Users;
exports.regvalidate = registrationValidation;
exports.loginvalidate = loginnValidation;