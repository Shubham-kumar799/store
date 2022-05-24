const express = require('express');

//controllers
const { createPaymentIntent } = require('../controllers/stripe');

//middlewares
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/payment/create-payment-intent', authCheck, createPaymentIntent);

module.exports = router;
