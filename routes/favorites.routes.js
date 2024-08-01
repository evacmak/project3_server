const router = require('express').Router();
const User = require('../models/User.model');

//Get by id
router.get('/favorites/:productId', async (req, res, next) => {
  try {
    const { userId } = req.params;
    const getFavoriteId = await User.findById(userId);
    res.status(200).json(getFavoriteId);
  } catch (error) {
    console.error(error);
  }
});

router.put('/favorites/:userId/:productId', async (req, res, next) => {
  try {
    const { productId, userId } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        //$set will either add or remove the id depending if it's there already
        // push to push, pull to remove
        $set: {
          favoriteProducts: productId,
        },
      },
      { new: true },
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
