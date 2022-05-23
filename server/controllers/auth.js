const User = require('../models/user');

const createUser = async (req, res) => {
  try {
    const { email } = req.user;
    const user = await new User({ email }).save();
    res.status(201).json({
      success: true,
      payload: user,
    });
  } catch (error) {
    console.log('error creating user => ', error);
    res.status(400).json({ success: false });
  }
};

const getUser = async (req, res) => {
  try {
    const { email } = req.user;

    const user = await User.findOne({ email: email }).exec();

    res.status(201).json({
      success: true,
      payload: user,
    });
  } catch (error) {
    console.log('error getting user => ', error);
    res.status(400).json({ success: false });
  }
};

const saveAddress = async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        address: req.body.address,
      },
      { new: true }
    );
    console.log('user with new address', user);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log('error saving  user address => ', error);
    res.status(400).json({ success: false });
  }
};

module.exports = {
  createUser,
  getUser,
  saveAddress,
};
