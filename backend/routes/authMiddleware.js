const jwt = require('jsonwebtoken');
const config = require('../config'); // Assuming you store your JWT secret in the config

// Middleware to authenticate and extract user_id from the JWT
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: 'Access token required' });
    }
    
    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = user; // Attach user data (e.g., user_id) to the request
        next();
    });
}

module.exports = authenticateToken;
