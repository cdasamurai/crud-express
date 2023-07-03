const jwt = require('jsonwebtoken');
const fs = require('fs');
const privateKey = fs.readFileSync('jwtRS256.key');

function securityMiddleware(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json('Unauthorized access')
    }

    try {
        const decoded = jwt.verify(token, privateKey);
        req.payload = decoded;
        next();
    }catch (error) {
        return res.status(401).json('Invalid token') 
    }
}

module.exports = securityMiddleware;