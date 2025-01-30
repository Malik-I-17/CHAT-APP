const express = require('express');
const { getMessage,createMessage } = require('../controller/message.controller');
const { authenticate } = require('../middlewares/authMiddleware');



const router = express.Router();

router.get('/',authenticate, getMessage);
router.post('/',authenticate, createMessage);

// router.get('/',authenticate, getMessage);


module.exports = router;