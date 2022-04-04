const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      minlength: [2, 'Too short'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    parent: { type: ObjectId, ref: 'Category', required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SubCategory', subCategorySchema);
