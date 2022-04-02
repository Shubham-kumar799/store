const express = require('express');

//controllers
const { createUser } = require('../controllers/auth');

//middlewares
const { authCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/create-or-update-user', authCheck, createUser);

module.exports = router;
