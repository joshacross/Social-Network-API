const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/post-list.html'));
});

router.get('/add-post', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/add-post.html'));
});

router.get('/post', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/post.html'));
});

module.exports = router;
