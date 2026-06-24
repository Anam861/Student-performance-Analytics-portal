const express = require('express');
const router = express.Router();

// Mock auth handlers for now
router.post('/login', (req, res) => res.json({ success: true, token: 'mock-jwt-token' }));
router.post('/register', (req, res) => res.json({ success: true, message: 'User registered' }));
router.get('/me', (req, res) => res.json({ success: true, user: { name: 'Mock User', role: 'admin' } }));

module.exports = router;
