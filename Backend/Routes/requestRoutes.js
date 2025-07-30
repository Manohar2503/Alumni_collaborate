const express = require('express');
const router = express.Router();
const requesting  = require('../controller/requestController');
const authMiddleware = require('../MiddleWares/authMiddleware');

router.post('/send/:status/:toUserId',authMiddleware,requesting);

module.exports = router;