const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  skinType: { type: String, required: true },
  skinConcern: { type: String, required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

const Review = model('Review', reviewSchema);
module.exports = Review;
