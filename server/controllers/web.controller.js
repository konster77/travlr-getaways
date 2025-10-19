const Trip=require('../models/Trip');

exports.home=(_req,res)=>res.render('home',{layout:'layouts/main'});

exports.trips = async (req, res) => {
  const { location, minPrice, maxPrice } = req.query;
  const q = {};
  if (location) q.location = new RegExp(location, 'i');
  if (minPrice || maxPrice) {
    q.price = {};
    if (minPrice) q.price.$gte = +minPrice;
    if (maxPrice) q.price.$lte = +maxPrice;
  }
  const trips = await Trip.find(q).lean();
  res.render('trips', { layout: 'layouts/main', trips, query: req.query });
};

exports.tripDetail=async (req,res)=>{
  const trip=await Trip.findOne({code:req.params.code}).lean();
  if(!trip) return res.status(404).render('home',{layout:'layouts/main', error:'Trip not found'});
  res.render('trip', { layout: 'layouts/main', trip });
};
