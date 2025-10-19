const mongoose=require('mongoose');
module.exports=mongoose.model('Itinerary', new mongoose.Schema({
  booking:{type:mongoose.Schema.Types.ObjectId, ref:'Booking', required:true},
  items:[{ day:Number, title:String, details:String }]
},{timestamps:true}));