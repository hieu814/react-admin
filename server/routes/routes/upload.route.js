var express = require('express');
var router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage })
var controller = require('../../controllers/upload.controller');

router.post('/updateImage', upload.single('image'),controller.updateImage);
router.post('/updateAudio', upload.single('audio'),controller.updateAudio);
module.exports = router;