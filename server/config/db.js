const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
    try {
        mongoose.set('strictQuery', true);
        await mongoose.connect(mongoUri);
        console.log('✅ MongoDB connected:', mongoose.connection.name);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
        process.exit(1);
    }

    mongoose.connection.on('disconnected', () => {
        console.warn('⚠️  MongoDB disconnected');
    });
};

module.exports = connectDB;

