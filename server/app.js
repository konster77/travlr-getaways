require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';
connectDB(mongoUri);

app.use('/api', require('./routes/api'));

app.get('/health', (_req, res) => res.json({ ok: true }));

const port = process.env.PORT || 3000;
app.get('/', (_req, res) => {
  res.send('Travlr API is running. Try <a href="/api/trips">/api/trips</a>.');
});
app.listen(port, () => console.log(`🚀 API listening on http://localhost:${port}`));
