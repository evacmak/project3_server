const router = require('express').Router();
const User = require('../models/User.model');

//Get by id
router.get('/favorites/:userId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const getUserFavorites = await User.findById(userId).populate(
      'favoriteProducts',
    );
    res.status(200).json(getUserFavorites);
  } catch (error) {
    console.error(error);
  }
});

router.put('/favorites/:userId/:productId', async (req, res, next) => {
  try {
    const { productId, userId } = req.params;

    const foundUser = await User.findById(userId);

    if (foundUser.favoriteProducts.includes(productId)) {
      await User.findByIdAndUpdate(
        userId,
        {
          //$set will either add or remove the id depending if it's there already
          // push to push, pull to remove
          $pull: {
            favoriteProducts: productId,
          },
        },
        { new: true },
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          //$set will either add or remove the id depending if it's there already
          // push to push, pull to remove
          $push: {
            favoriteProducts: productId,
          },
        },
        { new: true },
      );
    }

    res.status(200).json({ message: 'Added/removed from favorite' });
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
