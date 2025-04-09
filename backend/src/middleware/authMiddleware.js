import jwt from 'jsonwebtoken';
import config from '../config.js';
// Middleware to protect routes using JWT authentication.
// - Verifies token from Authorization header.
// - Attaches decoded user info to request if valid.
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
