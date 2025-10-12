const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  length: { type: Number, required: true },
  start: { type: Date, required: true },
  resort: { type: String },
  perPerson: { type: Number, required: true },
  image: { type: String },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Trip', TripSchema);