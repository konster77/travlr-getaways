const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  length: { type: Number, required: true },
  start: { type: String, required: true },
  resort: { type: String, required: true },
  perPerson: { type: Boolean, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  location: { type: String, required: true },
});

module.exports = mongoose.model('Trip', tripSchema);
