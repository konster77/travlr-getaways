const jwt = require('jsonwebtoken');

module.exports = function requireAuth(req, res, next) {
  const header = req.headers['authorization'] || '';
  const [type, token] = header.split(' ');
  if (type !== 'Bearer' || !token) return res.status(401).json({ message: 'Missing/invalid token' });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET); 
    next();
  } catch {
    res.status(401).json({ message: 'Unauthorized' });
  }
};
