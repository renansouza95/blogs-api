const express = require('express');
const PostsController = require('../controllers/blogposts');
const Auth = require('../middlewares/authentication');

const router = express.Router();

router.get('/', Auth.validateToken, PostsController.getAll);
router.get('/:id', Auth.validateToken, PostsController.getById);
router.post('/', Auth.authenticatePost, Auth.validateToken, PostsController.create);
router.put('/:id', Auth.authenticateUpdate, Auth.validateToken, PostsController.update);
router.delete('/:id', Auth.validateToken, PostsController.destroy);

module.exports = router;