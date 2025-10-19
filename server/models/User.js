const mongoose=require('mongoose');
module.exports=mongoose.model('User', new mongoose.Schema({
  email:{type:String,unique:true,lowercase:true,trim:true,required:true},
  passwordHash:{type:String,required:true},
  role:{type:String,enum:['customer','admin'],default:'customer'},
  name:String
},{timestamps:true}));
