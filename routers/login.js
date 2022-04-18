const express = require('express');
const LoginController = require('../controllers/login');
const Auth = require('../middlewares/authentication');

const router = express.Router();

router.post('/', Auth.authenticateLogin, LoginController.signIn);

module.exports = router;