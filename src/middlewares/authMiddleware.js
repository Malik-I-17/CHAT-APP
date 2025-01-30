const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    // console.log('token: ', token);


    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log('decoded: ', decoded);
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = { authenticate };