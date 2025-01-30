const jwt = require("jsonwebtoken");

const generateToken = (userId) => {

    
    const payLoad = {
        id: userId
    }
    
    return jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRY_TIME, // Token expiration time
    })

}

module.exports = { generateToken }