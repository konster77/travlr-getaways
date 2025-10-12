require('dotenv').config();
const mongoose = require('mongoose');
const Trip = require('./models/trip'); // make sure trip.js exists in /server/models

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr');
    console.log('Connected to MongoDB');

    // Clear existing data
    await Trip.deleteMany({});

    // Insert sample data
    await Trip.insertMany([
      {
        code: 'CANCUN5',
        name: 'Explore Cancun',
        length: 5,
        start: new Date('2025-12-20'),
        resort: 'Beachside Resort',
        perPerson: 1099,
        image: 'cancun.jpg',
        description: 'Sun, sand, and cenotes.'
      },
      {
        code: 'ROME7',
        name: 'Rome Highlights',
        length: 7,
        start: new Date('2026-03-10'),
        resort: 'Centro',
        perPerson: 1499,
        image: 'rome.jpg',
        description: 'Ancient history and pasta.'
      }
    ]);

    console.log('Seeded sample trips');
  } catch (error) {
    console.error(' Seeding error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
})();
