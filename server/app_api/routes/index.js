// server/app_api/routes/index.js
const express = require('express');
const router = express.Router();
const trips = require('../controllers/trips');

// sanity ping for this router (optional)
router.get('/', (_req, res) => res.json({ api: true }));

// CRUD for trips
router.get('/trips', trips.listTrips);
router.get('/trips/:code', trips.getTripByCode);
router.post('/trips', trips.createTrip);
router.put('/trips/:code', trips.updateTrip);
router.delete('/trips/:code', trips.deleteTrip);

module.exports = router;
