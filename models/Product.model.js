const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  title: { type: String },
  subtitle: { type: String },
  description: { type: String },
  color: { type: String },
  quantity: { type: Number },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  imageUrl: { type: String },
  price: { type: Number },
});

const Product = model('Product', productSchema);

module.exports = Product;
