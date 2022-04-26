const express = require('express');

//controllers
const { upload, remove, testUpload } = require('../controllers/cloudinary');

//middlewares
const { authCheck, adminCheck } = require('../middlewares/auth');

const router = express.Router();

router.post('/upload_images', upload);
router.get('/remove_image', remove);
router.post('/test_upload', testUpload);

module.exports = router;
