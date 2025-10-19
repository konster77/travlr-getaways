const router=require('express').Router();
const c=require('../controllers/web.controller');
router.get('/', c.home);
router.get('/trips', c.trips);
router.get('/trips/:code', c.tripDetail);
module.exports=router;
