const express = require('express');
const { z } = require('zod');
const { validate } = require('../middleware/zod');
const requireAuth = require('../middleware/requireAuth');
const Trip = require('../models/trip');

const router = express.Router();

const TripSchema = z.object({
  code: z.string().trim().min(2),
  name: z.string().trim().min(2),
  length: z.number().int().positive(),
  price: z.number().nonnegative(),
  start: z.string().refine(v => !Number.isNaN(Date.parse(v)), 'Invalid date'),
  resort: z.string().trim().min(1),
  image: z.string().trim().min(1),
  description: z.string().trim().min(1)
});

// Public reads
router.get('/', async (req, res) => { res.json(await Trip.find().lean()); });
router.get('/:code', async (req, res) => {
  const t = await Trip.findOne({ code: req.params.code }).lean();
  if (!t) return res.status(404).json({ message: 'Not found' });
  res.json(t);
});

// Admin writes
router.post('/', requireAuth, validate(TripSchema), async (req, res) => {
  const created = await Trip.create(req.body);
  res.status(201).json(created);
});
router.put('/:id', requireAuth, validate(TripSchema), async (req, res) => {
  const updated = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});
router.delete('/:id', requireAuth, async (req, res) => {
  const del = await Trip.findByIdAndDelete(req.params.id);
  if (!del) return res.status(404).json({ message: 'Not found' });
  res.status(204).end();
});

module.exports = router;
