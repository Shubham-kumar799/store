const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await new User({ email }).save();
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log('error creating user => ', error);
    res.status(400).json({ success: false });
  }
};

module.exports = {
  createUser,
};
