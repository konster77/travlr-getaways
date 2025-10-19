const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/travlr';

let isConnected = false;

async function connectDB() {
  if (isConnected) return; // prevent duplicate connects in dev hot-reloads
  mongoose.set('strictQuery', true);
  await mongoose.connect(MONGO_URI, { dbName: 'travlr' });
  isConnected = true;
  console.log(`✅ MongoDB connected: ${mongoose.connection.name}`);
}

module.exports = connectDB;
