const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header provided' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Format is Authorization: Bearer <token>' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.sessionId) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    req.sessionId = decoded.sessionId;

    // If sessionId is in path params, ensure it matches the token's sessionId
    if (req.params.sessionId && req.params.sessionId !== req.sessionId) {
      return res.status(403).json({ error: 'Unauthorized: Session mismatch' });
    }

    // Generate fresh token to slide the session window (lasts 2 hours)
    const newToken = jwt.sign({ sessionId: req.sessionId }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.setHeader('X-New-Token', newToken);

    next();
  } catch (error) {
    console.error('JWT auth error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};
