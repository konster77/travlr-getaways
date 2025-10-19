require('dotenv').config();
const mongoose = require('mongoose');
const Trip = require('../models/Trip');
const data = require('../seed/trips.json');

(async () => {
  try {
    if (!process.env.MONGODB_URI) throw new Error('Missing MONGODB_URI in .env');
    await mongoose.connect(process.env.MONGODB_URI);
    await Trip.deleteMany({});
    await Trip.insertMany(data);
    console.log(`✅ Seeded ${data.length} trips successfully`);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
  }
})();
