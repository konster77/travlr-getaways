const router=require('express').Router();
const {z}=require('zod'); const {validate}=require('../middleware/zod');
const requireAuth=require('../middleware/requireAuth');
const Booking=require('../models/Booking'); const Trip=require('../models/Trip');

const Create=z.object({ tripId:z.string(), travelers:z.number().int().positive().default(1), startDate:z.string().min(1) });

router.get('/', requireAuth(['customer','admin']), async (req,res)=>{
  const filter=req.user.role==='customer'? {user:req.user.sub}:{};
  const list=await Booking.find(filter).populate('trip').lean();
  res.json(list);
});

router.post('/', requireAuth(['customer']), validate(Create), async (req,res)=>{
  const {tripId, travelers, startDate}=req.body;
  const trip=await Trip.findById(tripId); if(!trip) return res.status(404).json({message:'Trip not found'});
  const totalPrice=trip.price*travelers;
  const b=await Booking.create({user:req.user.sub, trip:trip._id, travelers, totalPrice, startDate});
  res.status(201).json(await b.populate('trip'));
});

router.put('/:id/cancel', requireAuth(['customer','admin']), async (req,res)=>{
  const b=await Booking.findById(req.params.id);
  if(!b) return res.status(404).json({message:'Not found'});
  if(req.user.role==='customer' && String(b.user)!==req.user.sub) return res.status(403).json({message:'Forbidden'});
  b.status='cancelled'; await b.save(); res.json(b);
});

module.exports=router;
