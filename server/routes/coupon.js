const express = require('express');

//controllers
const { create, remove, list } = require('../controllers/coupon');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/coupon', authCheck, adminCheck, create);
router.get('/coupon', authCheck, adminCheck, list);
router.delete('/coupon/:couponId', authCheck, adminCheck, remove);

module.exports = router;
