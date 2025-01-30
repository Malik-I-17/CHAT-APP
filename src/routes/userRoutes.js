const express = require('express');
const { authenticate } = require('../middlewares/authMiddleware');


const { userRegister,userLogin} = require('../controller/user.controller');

const router = express.Router();


// ###########################################################################

router.get('/register_', userRegister);
router.get('/login', userLogin);


module.exports = router;