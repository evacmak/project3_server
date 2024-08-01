const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  color: { type: String },
  quantity: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

const Product = model('Product', userSchema);

module.exports = Product;
