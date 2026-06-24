const express = require('express');
const router = express.Router();

router.get('/student/:studentId', (req, res) => res.json({ success: true, grades: [] }));
router.post('/', (req, res) => res.json({ success: true, message: 'Grade created' }));
router.put('/:id', (req, res) => res.json({ success: true, message: 'Grade updated' }));
router.delete('/:id', (req, res) => res.json({ success: true, message: 'Grade deleted' }));

module.exports = router;
