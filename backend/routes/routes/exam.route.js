var express = require('express');
var router = express.Router();
var controller = require('../../controllers/exam.controllers');
var passport = require('passport');
const multer = require('multer');
const storage = multer.memoryStorage();
var upload = multer({ storage: storage })

router.get('/getAll', controller.getAll);
router.get('/test', controller.test);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('', controller.insert);
router.patch('/importCSV/:id', upload.single('file'),controller.importCSV);


module.exports = router;