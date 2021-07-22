const { Post } = require('../models');

const postController = {
        // get all posts
        getAllPost(req, res) {
          Post.find({})
            .populate({
              path: 'comments',
              select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1})
            .then(dbPostData => res.json(dbPostData))
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
        },

        // get one Post by id
        getPostById({ params }, res) {
          Post.findOne({ _id: params.id })
            .populate({
              path: 'comments',
              select: '-__v'
            })
            .select('-__v')
            .then(dbPostData => {
              // If no Post is found, send 404
              if (!dbPostData) {
                res.status(404).json({ message: 'No Post found with this id!' });
                return;
              }
              res.json(dbPostData);
            })
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
        },

            // createPost
        createPost({ body }, res) {
            Post.create(body)
            .then(dbPostData => res.json(dbPostData))
            .catch(err => res.status(400).json(err));
        },

            // update Post by id
        updatePost({ params, body }, res) {
            Post.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbPostData => {
                if (!dbPostData) {
                res.status(404).json({ message: 'No Post found with this id!' });
                return;
                }
                res.json(dbPostData);
            })
            .catch(err => res.status(400).json(err));
        },
            // delete Post
        deletePost({ params }, res) {
            Post.findOneAndDelete({ _id: params.id })
            .then(dbPostData => {
                if (!dbPostData) {
                res.status(404).json({ message: 'No Post found with this id!' });
                return;
                }
                res.json(dbPostData);
            })
            .catch(err => res.status(400).json(err));
        }
      };
  
  module.exports = PostController;