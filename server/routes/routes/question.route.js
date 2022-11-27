var express = require('express');
var router = express.Router();
var controller = require('../../controllers/question.controllers');
var passport = require('passport');
const multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage })


router.get('/getAll', controller.getAll);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.update);
router.delete('/:id/:examID', controller.delete);
router.post('/addGroup/:examID', controller.addGroup); 
router.patch('/updateGroupQuestion/:id', upload.fields([{ name: 'avatar', maxCount: 1 }]), controller.updateGroupQuestion); 
router.post('', controller.insert);
router.patch('/updateImage/:id', upload.single('image'),controller.updateImage);
router.patch('/updateAudio/:id', upload.single('audio'),controller.updateAudio);
module.exports = router;