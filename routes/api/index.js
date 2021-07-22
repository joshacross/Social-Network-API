const router = require('express').Router();
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// add prefix of `/posts` to routes created in `post-routes.js`
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;