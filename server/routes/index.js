const express = require('express');
const router = express.Router();

router.get('/trips', (_req, res) => {
  res.json([{ code: 'SANITY', name: 'Routing OK', length: 1, start: new Date(), perPerson: 1 }]);
});

router.post('/trips', (req, res) => {
  // echo what the client sent to prove body parsing works
  res.status(201).json({ created: true, body: req.body });
});

router.get('/trips/:code', (req, res) => {
  res.json({ code: req.params.code, name: 'One trip OK' });
});

router.put('/trips/:code', (req, res) => {
  res.json({ updated: true, code: req.params.code, changes: req.body });
});

router.delete('/trips/:code', (req, res) => {
  res.json({ deleted: true, code: req.params.code });
});

module.exports = router;
