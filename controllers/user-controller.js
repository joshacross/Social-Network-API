const { Thought, User } = require('../models');
// Do I need to destructure { Reaction } from the reactionSchema through Thought model?

const userController = {
    // add comment to Post
    addComment({ params, body }, res) {
        console.log(body);
        Comment.create(body)
            .then(({ _id }) => {
                return Post.findOneAndUpdate(
                    { _id: params.PostId },
                    { $push: { comments: _id } },
                    { new: true }
                );
            })
            //console.log( _id )
            .then(dbPostData => {
                if (!dbPostData) {
                    res.status(404).json({ message: 'No Post found with this id!'});
                    return;
                }
                res.json(dbPostData);
            })
            .catch(err => res.json(err));
    },

    addReply({ params, body }, res) {
      Comment.findOneAndUpdate(
        { _id: params.commentId },
        { $push: { replies: body } },
        { new: true, runValidators: true }
      )
        .then(dbPostData => {
          if (!dbPostData) {
            res.status(404).json({ message: 'No Post found with this id!' });
            return;
          }
          res.json(dbPostData);
        })
        .catch(err => res.json(err));
    },

    // remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
          .then(deletedComment => {
            if (!deletedComment) {
              return res.status(404).json({ message: 'No comment with this id!' });
            }
            return Post.findOneAndUpdate(
              { _id: params.PostId },
              { $pull: { comments: params.commentId } },
              { new: true }
            );
          })
          .then(dbPostData => {
            if (!dbPostData) {
              res.status(404).json({ message: 'No Post found with this id!' });
              return;
            }
            res.json(dbPostData);
          })
          .catch(err => res.json(err));
      },
      
      // remove reply
      removeReply({ params }, res) {
        Comment.findOneAndUpdate(
          { _id: params.commentId },
          { $pull: { replies: { replyId: params.replyId } } },
          { new: true }
        )
          .then(dbPostData => res.json(dbPostData))
          .catch(err => res.json(err));
      }
};

module.exports = commentController;