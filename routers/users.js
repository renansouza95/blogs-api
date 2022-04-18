const express = require('express');
const UserController = require('../controllers/users');
const Auth = require('../middlewares/authentication');

const router = express.Router();

router.get('/', Auth.validateToken, UserController.getAll);
router.get('/:id', Auth.validateToken, UserController.getById);
router.post('/', Auth.authenticateUser, UserController.create);

module.exports = router;