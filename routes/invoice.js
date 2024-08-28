const express = require('express');
const router = express.Router();
const InvoiceController = require('../controller/InvoiceController.js');

console.log('IT Router');

router.get('/',InvoiceController.index);
router.get('/data',InvoiceController.getData);


module.exports = router;