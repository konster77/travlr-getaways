require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Trip = require('../models/Trip');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
const TRIPS_PATH = path.join(__dirname, '../../trips.json');

(async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Connected for seeding');

        const raw = fs.readFileSync(TRIPS_PATH, 'utf8');
        const data = JSON.parse(raw);

        for (const t of data) {
            await Trip.findOneAndUpdate({ code: t.code }, t, {
                upsert: true, new: true, setDefaultsOnInsert: true
            });
            console.log('⬆️  Upserted', t.code);
        }

        console.log('🎉 Seeding complete');
    } catch (err) {
        console.error('❌ Seed error:', err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
})();
