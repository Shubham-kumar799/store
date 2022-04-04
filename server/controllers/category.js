const Category = require('../models/category');
const slugify = require('slugify');

const create = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await new Category({
      name,
      slug: slugify(name).toLowerCase(),
    }).save();
    res.status(201).json({
      success: true,
      payload: category,
    });
  } catch (error) {
    console.log('error in creat category', error);
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const list = async (_, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({
      success: true,
      payload: categories,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const read = async (req, res) => {
  try {
    const { slug } = req.params.slug;

    const category = await Category.find({ slug });
    res.status(200).json({
      success: true,
      payload: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const update = async (req, res) => {
  try {
    const { slug } = req.params;
    const { name } = req.body;
    const category = await Category.findOneAndUpdate(
      { slug },
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).json({
      success: true,
      payload: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

const remove = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await Category.findOneAndDelete({ slug });
    res.status(200).json({
      success: true,
      payload: category,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Internal Server Error',
    });
  }
};

module.exports = {
  create,
  update,
  list,
  remove,
  read,
};
