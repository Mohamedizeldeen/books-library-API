const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // In production, use environment variable

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user;
        next();
    });
};

// Generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
};

module.exports = { authenticateToken, generateToken, JWT_SECRET };
