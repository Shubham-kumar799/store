const express = require('express');

//controllers
const { create, read, readAll, updateStatus } = require('../controllers/order');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

//creates and order
router.post('/orders', authCheck, create);

//get all orders of the user
router.get('/orders/:userId', read);

//get all orders
router.get('/orders', readAll);

//update status of order
router.put('/orders/:orderId', authCheck, adminCheck, updateStatus);

module.exports = router;
