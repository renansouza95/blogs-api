const express = require('express');
const CategoryController = require('../controllers/categories');
const Auth = require('../middlewares/authentication');

const router = express.Router();

router.get('/', Auth.validateToken, CategoryController.getAll);
router.post('/', Auth.authenticateCategory, Auth.validateToken, CategoryController.create);

module.exports = router;