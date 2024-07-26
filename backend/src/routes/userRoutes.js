const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/getUserData', userController.getUserData);

module.exports = router;