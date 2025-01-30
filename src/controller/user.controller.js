const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const { generateToken } = require('../utils/jwtToken')

const userRegister = async (req, res) => {

    try {
        const { name, password, mobile } = req.body;
        const user = await User.findOne({ where: { mobilenumber: mobile } });
        if (user) {
            return res.json({
                status: 201,
                message: 'you already register please login'
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createUser = await User.create({ username: name, password: hashedPassword,mobilenumber:mobile });
        console.log('user: ', user);
        console.log('hashedPassword: ', hashedPassword);

        return res.json({
            status: 200,
            message: 'success',
            data: createUser
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// ###########################################################################################

const userLogin = async (req, res) => {
    try {
        const { name, password } = req.body;

        // Find user by username only
        const user = await User.findOne({ where: { username: name } });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        // Generate JWT token
        const token = generateToken(user.id);
        return res.status(200).json({
            message: 'Success',
            data: token
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { userRegister, userLogin }