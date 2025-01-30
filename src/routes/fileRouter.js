const express = require('express');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

const { bulkFileUpload } = require('../controller/bulkfileupload.controller');
const { authenticate } = require('../middlewares/authMiddleware');



const router = express.Router();

router.post('/', authenticate, upload.array('files'),bulkFileUpload);



module.exports = router;