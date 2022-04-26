const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const upload = async (req, res) => {
  try {
    let result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`,
      resource_type: 'auto', //jpeg , png etc
    });
    res.status(201).json({
      success: true,
      payload: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });
  } catch (error) {
    console.log('error in upload cloudinary', error);
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const remove = async (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err)
      return res.status(400).json({
        success: false,
        payload: 'Internal Server Error',
      });
    res.status(200).json({
      success: true,
    });
  });
};

const testUpload = async (req, res) => {
  try {
    console.log('Images => ', req);
    res.status(200).json({ success: true });
  } catch (error) {
    console.log('error in test uploaed');
    res.status(400).json({ success: false });
  }
};

module.exports = {
  upload,
  remove,
  testUpload,
};
