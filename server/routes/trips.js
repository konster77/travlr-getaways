const router=require('express').Router();
const Trip=require('../models/Trip');
const {z}=require('zod'); const {validate}=require('../middleware/zod');
const requireAuth=require('../middleware/requireAuth');

const TripSchema=z.object({
  code:z.string().min(2), name:z.string().min(2), location:z.string().min(1),
  length:z.number().int().positive(), price:z.number().nonnegative(),
  start:z.string().min(1), resort:z.string().min(1), image:z.string().min(1), description:z.string().min(1),
  tags:z.array(z.string()).optional()
});

router.get('/', async (req,res)=>{
  const {location,minPrice,maxPrice}=req.query;
  const q={};
  if(location) q.location=new RegExp(location,'i');
  if(minPrice||maxPrice) q.price={};
  if(minPrice) q.price.$gte=Number(minPrice);
  if(maxPrice) q.price.$lte=Number(maxPrice);
  res.json(await Trip.find(q).lean());
});
router.get('/:code', async (req,res)=>{
  const t=await Trip.findOne({code:req.params.code}).lean();
  if(!t) return res.status(404).json({message:'Not found'}); res.json(t);
});

router.post('/', requireAuth(['admin']), validate(TripSchema), async (req,res)=>{
  const created=await Trip.create(req.body); res.status(201).json(created);
});
router.put('/:id', requireAuth(['admin']), validate(TripSchema), async (req,res)=>{
  const updated=await Trip.findByIdAndUpdate(req.params.id, req.body, {new:true});
  if(!updated) return res.status(404).json({message:'Not found'}); res.json(updated);
});
router.delete('/:id', requireAuth(['admin']), async (req,res)=>{
  const del=await Trip.findByIdAndDelete(req.params.id);
  if(!del) return res.status(404).json({message:'Not found'}); res.status(204).end();
});

module.exports=router;
