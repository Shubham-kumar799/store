const admin = require('../firebase');

const authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.auth_token);
    req.user = firebaseUser;
    next();
  } catch (error) {
    console.log('Error in authCheck middleware => ', error);
    res.status(403).json({
      success: false,
      error: 'Unauthenticated',
    });
  }
};

const adminCheck = async (req, res, next) => {
  try {
    const { email } = req.user;
    const adminUser = await User.findOne({ email });
    if (adminUser.role !== 'admin') {
      res.status(403).json({
        success: false,
        error: 'Forbidden',
      });
    } else {
      next();
    }
  } catch (error) {
    console.log('Error in adminCheck middleware => ', error);
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

module.exports = { authCheck , adminCheck };
