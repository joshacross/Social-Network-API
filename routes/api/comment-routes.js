const router = require('express').Router();
const {
    addComment,
    removeComment,
    addReply,
    removeReply
  } = require('../../controllers/comment-controller');
// api/comments/<postId>
router.route('/:postId').post(addComment);

// /api/comments/<postId>/<commentId>
router.route('/:postId').post(addComment);

// /api/comments/<postId>/<commentId>
router.route('/:postId/:commentId').delete(removeComment);

// replys - api/comments/<postId>/<commentId>
router
  .route('/:postId/:commentId')
  .put(addReply)
  .delete(removeComment);

// delete replys
router.route('/:postId/:commentId/:replyId').delete(removeReply);


module.exports = router;