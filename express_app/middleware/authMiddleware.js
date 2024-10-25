const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

// Protected Route Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return res.sendStatus(401) // Unauthorized
  
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.sendStatus(403) // Forbidden
      req.user = user;
      next()
    });
  };

module.exports = { authenticateToken }