const Trip = require('../models/Trip');

exports.listTrips = async (req, res) => {
  try {
    const q = req.query.q;
    let filter = { status: 'ACTIVE' };
    if (q) filter = { ...filter, $text: { $search: q } };

    const trips = await Trip.find(filter).sort({ start: 1 }).lean();
    res.json(trips);
  } catch (err) {
    console.error('listTrips error', err);
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
};

exports.getTrip = async (req, res) => {
  try {
    const trip = await Trip.findOne({ code: req.params.code.toUpperCase() }).lean();
    if (!trip) return res.status(404).json({ error: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    console.error('getTrip error', err);
    res.status(500).json({ error: 'Failed to fetch trip' });
  }
};
