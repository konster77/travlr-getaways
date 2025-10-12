const express = require('express');
const router = express.Router();
const tripsCtrl = require('../controllers/trips');

// Standardized naming: collection vs item by code
router.get('/trips', tripsCtrl.getTrips);
router.get('/trips/:tripCode', tripsCtrl.getTripByCode);

module.exports = router;
