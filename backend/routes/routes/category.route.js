var express = require('express');
var router = express.Router();
var controller = require('../../controllers/category.controllers');
var passport = require('passport');

router.get('/getAll', controller.getAll);
router.get('/:id', controller.getOne);
router.patch('/:id', controller.update);
router.delete('/:id', controller.delete);
router.post('/insert', controller.insert);

module.exports = router;