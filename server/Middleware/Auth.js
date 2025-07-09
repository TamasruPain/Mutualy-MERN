const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({
            message: "Access denied, no token provided",
            success: false
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded token in middleware:", decodedToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Unauthorized, jwt token is invalid or expired",
            success: false,
        })
    }
}

module.exports = ensureAuthenticated;