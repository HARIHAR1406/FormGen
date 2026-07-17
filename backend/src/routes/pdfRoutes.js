const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const pdfController = require('../controllers/pdfController');

router.post('/generate', verifyToken, pdfController.generatePDF);

module.exports = router;
