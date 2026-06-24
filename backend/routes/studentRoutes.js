const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.json({ success: true, students: [] }));
router.get('/:id', (req, res) => res.json({ success: true, student: {} }));
router.post('/', (req, res) => res.json({ success: true, message: 'Student created' }));
router.put('/:id', (req, res) => res.json({ success: true, message: 'Student updated' }));
router.delete('/:id', (req, res) => res.json({ success: true, message: 'Student deleted' }));

module.exports = router;
