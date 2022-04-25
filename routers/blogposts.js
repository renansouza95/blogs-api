const express = require('express');
const PostsController = require('../controllers/blogposts');
const Auth = require('../middlewares/authentication');

const router = express.Router();

router.get('/', Auth.validateToken, PostsController.getAll);
router.get('/:id', Auth.validateToken, PostsController.getById);
router.delete('/:id', Auth.validateToken, PostsController.destroy);
router.post('/', Auth.authenticatePost, Auth.validateToken, PostsController.create);
// router.delete('/:id', Auth.validateToken, PostsController.destroy);

module.exports = router;