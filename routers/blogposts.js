const express = require('express');
const PostsController = require('../controllers/blogposts');

const router = express.Router();

router.get('/', PostsController.getAll);
router.get('/:id', PostsController.getById);
router.post('/', PostsController.create);

module.exports = router;