const express = require('express');
const CategoryController = require('../controllers/categories');

const router = express.Router();

router.get('/', CategoryController.getAll);
router.post('/', CategoryController.create);

module.exports = router;