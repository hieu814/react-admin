var express = require('express');
var router = express.Router();
var controller = require('../../controllers/vocabulary.controller');
const multer = require('multer');
const awsS3Service = require('../../services/AwsS3Service');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage })

router.get('/getAll', controller.getAll);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('', controller.insert);
router.get("/words/:name", controller.getWord);
router.patch('/updateImage/:id', upload.single('image'),controller.updateImage);
module.exports = router;