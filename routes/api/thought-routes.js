const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
  } = require('../../controllers/thought-controller');

// api/thoughts/
router.route('/')
.get(getAllThoughts)
.post(createThought);

// api/thoughts/thoughtId
router.route('/:thoughtId')
.get(getThoughtById)
.post(updateThought)
.delete(deleteThought)

// /api/thoughts/<thoughtId>
router.route('/:userId/:thoughtId').delete(deleteThought);

// reactions - api/comments/<thoughtId>/reactions/<reactionId>
router.route('/:thoughtId/reactions/')
  .put(addReaction)

router.route('./:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;