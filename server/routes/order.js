const express = require('express');

//controllers
const { create, read } = require('../controllers/order');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//creates and order
router.post('/order', authCheck, create);

//get all orders of the user
router.get('/orders/:userId', read);

module.exports = router;
