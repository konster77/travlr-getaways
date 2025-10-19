const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { z } = require('zod');

const User = require('../models/User');

// minimal validator (you can keep your zod middleware if you already added it)
const Login = z.object({ email: z.string().email(), password: z.string().min(6) });

router.get('/ping', (_req, res) => res.json({ ok: true })); // <-- temp GET to test mounting

router.post('/login', async (req, res) => {
  const parsed = Login.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: 'Validation failed' });

  const { email, password } = parsed.data;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = jwt.sign(
    { sub: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  res.json({ token, role: user.role });
});

module.exports = router;   // <-- do not forget this
