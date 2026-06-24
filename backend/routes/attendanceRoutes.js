const express = require('express');
const router = express.Router();

router.get('/student/:studentId', (req, res) => res.json({ success: true, attendance: [] }));
router.post('/', (req, res) => res.json({ success: true, message: 'Attendance logged' }));
router.post('/bulk', (req, res) => res.json({ success: true, message: 'Bulk attendance logged' }));

module.exports = router;
