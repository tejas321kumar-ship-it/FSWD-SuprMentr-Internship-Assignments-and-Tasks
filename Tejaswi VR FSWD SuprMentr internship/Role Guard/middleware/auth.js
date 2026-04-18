const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader.indexOf('Bearer ') !== 0) {
    res.status(401).json({ message: 'Token missing or invalid format' });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'role_guard_secret');
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}

module.exports = authMiddleware;
