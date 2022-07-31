var express = require('express');
var router = express.Router();
var authController = require('../../controllers/auth');
var passport = require('passport');
//Middle ware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// Define the home page route
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.get('/profile',passport.authenticate('jwt', { session: false }), authController.profile);

// Define the about route
router.get('/about', function(req, res) {
  res.send('About us');
});


module.exports = router;