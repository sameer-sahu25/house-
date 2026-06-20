const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Session = require('../models/Session');

// POST /api/auth/session - Create a new anonymous session and sign a JWT
router.post('/session', async (req, res) => {
  try {
    const sessionId = crypto.randomUUID();

    // Save session in database
    const session = new Session({ sessionId });
    await session.save();

    // Sign JWT (valid for 2 hours)
    const token = jwt.sign({ sessionId }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.status(201).json({ token, sessionId });
  } catch (error) {
    console.error('Session creation failed:', error);
    res.status(500).json({ error: 'Failed to create anonymous session' });
  }
});

module.exports = router;
