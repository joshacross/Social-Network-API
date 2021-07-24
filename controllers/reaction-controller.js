const { Thought } = require('../models');
// Do I need to destructure reactionSchema as { Reaction } from Thought model?

const reactionController = {
    // add comment to Post
    addReaction({ params, body }, res) {
        console.log(body);
        Reaction.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate(
                    { _id: params.ThoughtId },
                    { $push: { reactions: _id } },
                    { new: true }
                );
            })
            //console.log( _id )
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!'});
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // remove comment
    removeReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.reactionId })
          .then(deletedReaction => {
            if (!deletedReaction) {
              return res.status(404).json({ message: 'No reaction with this id!' });
            }
            return Thought.findOneAndUpdate(
              // Find out thoughtId when there is none in the models?...
              { _id: params.thoughtId },
              { $pull: { reactions: params.reactionId } },
              { new: true }
            );
          })
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No Thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },
};

module.exports = reactionController;