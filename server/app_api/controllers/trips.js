// server/app_api/controllers/trips.js
const Trip = require('../../models/trip');

// GET /api/trips
exports.listTrips = async (req, res) => {
  const trips = await Trip.find().lean();
  res.json(trips);
};

// GET /api/trips/:code
exports.getTripByCode = async (req, res) => {
  const trip = await Trip.findOne({ code: req.params.code }).lean();
  if (!trip) return res.status(404).json({ message: `Trip with code ${req.params.code} not found.` });
  res.json(trip);
};

// POST /api/trips
exports.createTrip = async (req, res) => {
  try {
    const { code, name, length, start, perPerson, resort, image, description } = req.body;
    if (!code || !name || !length || !start || !perPerson) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }
    const created = await Trip.create({
      code: String(code).trim(),
      name: String(name).trim(),
      length: Number(length),
      start: new Date(start),
      perPerson: Number(perPerson),
      resort,
      image,
      description
    });
    res.status(201).json(created);
  } catch (err) {
    if (err?.code === 11000) return res.status(409).json({ message: 'Trip code already exists.' });
    console.error('Create trip error:', err);
    res.status(500).json({ message: 'Server error creating trip.' });
  }
};

// PUT /api/trips/:code
exports.updateTrip = async (req, res) => {
  const { name, length, start, perPerson, resort, image, description } = req.body;
  const updated = await Trip.findOneAndUpdate(
    { code: req.params.code },
    {
      ...(name !== undefined && { name }),
      ...(length !== undefined && { length }),
      ...(start !== undefined && { start: new Date(start) }),
      ...(perPerson !== undefined && { perPerson }),
      ...(resort !== undefined && { resort }),
      ...(image !== undefined && { image }),
      ...(description !== undefined && { description })
    },
    { new: true }
  ).lean();
  if (!updated) return res.status(404).json({ message: `Trip with code ${req.params.code} not found.` });
  res.json(updated);
};

// DELETE /api/trips/:code
exports.deleteTrip = async (req, res) => {
  const deleted = await Trip.findOneAndDelete({ code: req.params.code }).lean();
  if (!deleted) return res.status(404).json({ message: `Trip with code ${req.params.code} not found.` });
  res.json({ deleted: true, code: req.params.code });
};
