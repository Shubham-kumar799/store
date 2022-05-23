const express = require('express');

//controllers
const { createUser, getUser, saveAddress } = require('../controllers/auth');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-user', authCheck, createUser);
router.get('/user', authCheck, getUser);
router.get('/admin', authCheck, adminCheck, getUser);
//save user address
router.post('/user/address', authCheck, saveAddress);

module.exports = router;
