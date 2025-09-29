const { Schema, model } = require('mongoose');

const TripSchema = new Schema(
  {
    code: {
      type: String,
      required: [true, 'Trip code is required'],
      uppercase: true,
      trim: true,
      minlength: [3, 'Code must be at least 3 chars'],
      maxlength: [10, 'Code must be at most 10 chars'],
      unique: true
    },
    name: { type: String, required: true, trim: true, minlength: 3 },
    length: { type: Number, required: true, min: 1 },
    start: { type: Date, required: true },
    resort: { type: String, required: true, trim: true },
    perPerson: { type: Number, required: true, min: 0 },
    image: { type: String, trim: true },
    description: { type: String, trim: true, maxlength: 2000 },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' }
  },
  { timestamps: true }
);

TripSchema.index({ name: 'text', resort: 'text', description: 'text' });

module.exports = model('Trip', TripSchema);
