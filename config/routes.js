const express = require('express');
const router = express.Router();
const staticsController = require('../controllers/statics');
const favoritesController = require('../controllers/favorites');


router.route('/')
  .get(staticsController.home);

router.route('/favorites')
  .get(favoritesController.favoriteList);

router.route('/save-favorites')
  .get(favoritesController.save_favorites);

router.route('/more-details')
  .get(favoritesController.more_details);


module.exports = router;
