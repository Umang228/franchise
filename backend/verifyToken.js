const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Token not provided' });

  jwt.verify(token.split(' ')[1], 'lecturevecture', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = decoded;
    req.email = decoded.user.email;
    next();
  });
};

module.exports = verifyToken;
