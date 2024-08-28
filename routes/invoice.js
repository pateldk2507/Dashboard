const express = require('express');
const router = express.Router();
const ITController = require('../controller/ITController.js');

console.log('IT Router');

router.get('/',ITController.index);


module.exports = router;