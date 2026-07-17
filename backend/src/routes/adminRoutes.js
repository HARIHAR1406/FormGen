const express = require('express');
const router = express.Router();
const { verifyAdmin } = require('../middleware/verifyToken');
const adminController = require('../controllers/adminController');

router.get('/stats', verifyAdmin, adminController.getStats);
router.get('/users', verifyAdmin, adminController.getUsers);
router.delete('/users/:uid', verifyAdmin, adminController.deleteUser);
router.post('/set-admin/:uid', verifyAdmin, adminController.setAdminRole);

module.exports = router;
