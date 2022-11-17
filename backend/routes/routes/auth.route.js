var express = require('express');
var router = express.Router();
var authController = require('../../controllers/auth.controllers');
var passport = require('passport');
const multer = require('multer');
const awsS3Service = require('../../services/AwsS3Service');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage })
router.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});


// Define the home page route
router.post('/signup', authController.register);
router.post('/login', authController.login);
router.get('/google',
  passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));
router.get('/google/redirect',
  passport.authenticate('google', { session: false }),
  authController.googleredirect);

router.get('/profile', passport.authenticate('jwt', { session: false }), authController.profile);

// Define the about route
router.post('/uploadfile', upload.single('file'), async (req, res, next) => {
  try {
    const file = req.file
    console.log(file)
    const content = await awsS3Service.uploadFile(file);
    res.send(content);
  } catch (error) {
    next(error)
  }

});
router.post('/uploadfile2', async (req, res, next) => {
  try {
    const file = req.file
    console.log(file)
    const content = await awsS3Service.deleteFile('undefined_Sutton-1.jpg');
    res.send(content);
  } catch (error) {
    next(error)
  }

});


module.exports = router;