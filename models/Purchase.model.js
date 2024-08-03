const { Schema, model } = require('mongoose');

const purchaseSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    total: { type: Number, required: true },
    address: { type: String },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: 'Products',
          required: true,
        },
        quantity: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Purchase = model('Purchase', purchaseSchema);
module.exports = Purchase;
