require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/travlr';

(async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    const email = 'admin@example.com';
    const password = 'Admin!234';
    const passwordHash = await bcrypt.hash(password, 10);

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email, passwordHash, role: 'admin' });
      console.log('Created admin:', email, 'password:', password);
    } else {
      console.log('Admin exists:', email);
    }
  } catch (e) {
    console.error(e);
  } finally {
    await mongoose.disconnect();
  }
})();
