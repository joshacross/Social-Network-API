const router = require('express').Router();
const {
    getAllPost,
    getPostById,
    createPost,
    updatePost,
    deletePost
  } = require('../../controllers/post-controller');

// Set up GET all and POST at /api/posts
router
  .route('/')
  .get(getAllPost)
  .post(createPost);

// Set up GET one, PUT, and DELETE at /api/Posts/:id
router
  .route('/:id')
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

module.exports = router;