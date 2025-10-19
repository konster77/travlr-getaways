const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

(async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI is missing. Create server\\.env with MONGODB_URI=...');
    }

    await mongoose.connect(uri);

    const email = 'admin@example.com';
    const password = 'Admin!234';

    let user = await User.findOne({ email });
    if (!user) {
      const passwordHash = await bcrypt.hash(password, 10);
      user = await User.create({ email, passwordHash, role: 'admin', name: 'Site Admin' });
      console.log('Created admin:', email, 'password:', password);
    } else {
      console.log('Admin exists:', email);
    }
  } catch (e) {
    console.error('Seed error:', e.message);
  } finally {
    await mongoose.disconnect().catch(() => {});
  }
})();
