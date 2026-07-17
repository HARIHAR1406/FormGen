const admin = require('firebase-admin');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    await verifyToken(req, res, async () => {
      const userRecord = await admin.auth().getUser(req.user.uid);
      const claims = userRecord.customClaims;
      if (claims && claims.admin === true) {
        next();
      } else {
        return res.status(403).json({ error: 'Admin access required' });
      }
    });
  } catch (error) {
    return res.status(403).json({ error: 'Authorization failed' });
  }
};

module.exports = { verifyToken, verifyAdmin };
