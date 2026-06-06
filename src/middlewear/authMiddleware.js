const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.jwt_secret);
        req.user = decoded; // Contains { id: user.id }
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};