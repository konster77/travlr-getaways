const router = require('express').Router();
const trips = require('../controllers/trips.controller');

router.get('/trips', trips.listTrips);
router.get('/trips/:code', trips.getTrip);

module.exports = router;
