require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => { console.log(req.method, req.url); next(); });

// --- DB connect ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected: travlr'))
  .catch(err => console.error('Mongo error', err));

// --- API router ---
const apiRouter = require('./app_api/routes');
app.use('/api', apiRouter);
app.use('/api/auth', require('./routes/auth'));   
app.use('/api/trips', require('./routes/trips'));


// --- Health route (must be BEFORE 404 handler) ---
app.get('/health', (req, res) => res.status(200).json({ ok: true }));

// --- Frontend root (optional) ---
app.get('/', (req, res) => res.status(200).send('Travlr Getaways Home'));

// --- 404 handler (keep this near the end) ---
app.use((req, res) => res.status(404).json({ message: 'Not Found' }));

// --- Error handler (last) ---
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API listening on http://localhost:${PORT}`));
