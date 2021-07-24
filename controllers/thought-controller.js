const { Thought } = require('../models');

const thoughtController = {
        // get all posts
        getAllThoughts(req, res) {
          Thought.find({})
            .populate({
              path: 'comments',
              select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1})
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
        },

        // get one Thought by id
        getThoughtById({ params }, res) {
          Thought.findOne({ _id: params.id })
            .populate({
              path: 'comments',
              select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => {
              // If no Thought is found, send 404
              if (!dbThoughtData) {
                res.status(404).json({ message: 'No Thought found with this id!' });
                return;
              }
              res.json(dbThoughtData);
            })
            .catch(err => {
              console.log(err);
              res.status(400).json(err);
            });
        },

            // createPost
        createThought({ body }, res) {
            Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.status(400).json(err));
        },

            // update Post by id
        updateThought({ params, body }, res) {
            Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No Post found with this id!' });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
        },
            // delete Post
        deleteThought({ params }, res) {
            Thought.findOneAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                res.status(404).json({ message: 'No Post found with this id!' });
                return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
        }
      };
  
  module.exports = thoughtController;