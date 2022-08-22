var express = require('express');
var router = express.Router();
var usersController = require('../../controllers/users.controllers');
var passport = require('passport');

router.get('/getAll', usersController.fetchUsers);
router.get('/:id', usersController.getOne);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.delete);
router.post('', usersController.insert);

module.exports = router;