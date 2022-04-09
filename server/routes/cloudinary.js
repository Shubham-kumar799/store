const express = require('express');

//controllers
const { upload, remove } = require('../controllers/cloudinary');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/upload_images', authCheck, adminCheck, upload);
router.get('/remove_image', authCheck, adminCheck, remove);

module.exports = router;
