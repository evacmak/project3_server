const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    profilePic: String,
    username: String,
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String },
    favoriteProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
    purchases: [{ type: Schema.Types.ObjectId, ref: 'Purchase' }],
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  },
);

const User = model('User', userSchema);

module.exports = User;
