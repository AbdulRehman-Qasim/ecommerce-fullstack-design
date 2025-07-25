const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header with Bearer token is present
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Decode token and extract payload
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info (excluding password) to req.user
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('JWT Error:', error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = protect;
