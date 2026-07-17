const express = require('express');
const router = express.Router();
const multer = require('multer');
const aiController = require('../controllers/aiController');

// Multer config for PDF uploads in memory
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
});

// Define AI routes
router.post('/analyze-resume', aiController.analyzeResume);
router.post('/interview-prep', aiController.interviewPrep);
router.post('/recommend-template', aiController.recommendTemplate);
router.post('/import-resume', upload.single('resumePdf'), aiController.importResume);

module.exports = router;
