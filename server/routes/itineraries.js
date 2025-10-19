const router=require('express').Router();
const requireAuth=require('../middleware/requireAuth');
const Itinerary=require('../models/Itinerary');

router.get('/:bookingId', requireAuth(['customer','admin']), async (req,res)=>{
  const i=await Itinerary.findOne({booking:req.params.bookingId}).lean();
  if(!i) return res.status(404).json({message:'No itinerary'});
  // (Optionally verify ownership when role is customer)
  res.json(i);
});

module.exports=router;
