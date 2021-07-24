const { Thought } = require('../models');
// do I need to destructure Thoughts to add in reaction? 

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
    console.log(params);
    Thought.findOne({ _id: params.id })
      // .populate({
      //   path: 'reactions',
      //   select: '-__v'
      // })
      // .select('-__v')
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
  },
  /////// find thought and add reaction /// 
  addReaction({ params }, res) {
    console.log(params);
    //find thought and update by adding a reaction
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      // cannot have multiple reactions of the same reaction from the same user
      // if reaction does not exist, addToSet
      { $addToSet: { reactions: { params, reactionId}}},
      { new: true, runValidators: true })
      .then(ddThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
  /////// find thought and reaction by id and delete reaction ////
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params, reactionId}}},
      )
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
    }
  };
  
  module.exports = thoughtController;