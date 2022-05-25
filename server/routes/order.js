const express = require('express');

//controllers
const { create } = require('../controllers/order');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/order', authCheck, create);

module.exports = router;
