const express = require('express');
const router = express.Router();
const ITController = require('../controller/ITController.js');

console.log('IT Router');

router.get('/',ITController.index);

// router.use('/month', require('./month'));
// router.use('/week', require('./week'));
// router.use('/invoice',require('./invoice'));


module.exports = router;