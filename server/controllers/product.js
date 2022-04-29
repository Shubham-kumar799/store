const Product = require('../models/product');
const slugify = require('slugify');

const create = async (req, res) => {
  try {
    req.body.product.slug = slugify(req.body.product.name);
    const product = await new Product(req.body.product).save();
    res.status(201).json({
      success: true,
      payload: product,
    });
  } catch (error) {
    console.log('error creating product', error);
    res.status(400).json({
      success: false,
      payload: 'Internal server error',
    });
  }
};

const list = async (_, res) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      success: true,
      payload: products,
    });
  } catch (error) {
    console.log('error listing product', error);
    res.status(400).json({
      success: false,
      payload: 'Internal server error',
    });
  }
};

const remove = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      payload: 'Internal server error',
    });
  }
};

const readBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });

    res.status(201).json({
      success: true,
      payload: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      payload: 'Internal server error',
    });
  }
};

module.exports = {
  create,
  list,
  remove,
  readBySlug,
};
