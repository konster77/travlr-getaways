const mongoose=require('mongoose');
module.exports=mongoose.model('Booking', new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true},
  trip:{type:mongoose.Schema.Types.ObjectId, ref:'Trip', required:true},
  travelers:{type:Number, default:1},
  totalPrice:Number,
  status:{type:String, enum:['reserved','paid','cancelled'], default:'reserved'},
  startDate:String
},{timestamps:true}));
