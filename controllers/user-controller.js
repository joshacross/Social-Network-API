// Do I need to destructure { Reaction } from the reactionSchema through Thought model?


  // findOne user and pull their thoughts and friends (leave out passsword)

  // create a user and ?use bcrypt? or does the model do that for us

  // login user by email and password // then find one by their email
  // if no user is found, throw err
  // if password is await correct password
  // if password is incorrect, throw err
  // else login user and alert

  // updateUser

  // deleteUser

  // addFriend

  // removeFriend

  // I believe I have to add a thought and reaction, but... might be taken care of
  // with the thought-controller.


const { User } = require('../models');

const userController = {
  //////// get all users/////////
  getAllUsers(req, res) {
    User.find({})
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  /////// get one user by id ///////
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'friends',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  /////// createUser /////// 
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  },
  /////// Update user by id ///////
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  /////// find one user and delete User ///////
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  }, 
  /////// add friend to user /////////
  addFriend({ params }, res) {
    // find a user, then add friend to user
    User.findOneAndUpdate(
      // {$createIndexes: $**}
      { _id: params.userId },
      { $addToSet: { friends: { friendsId: params.friendsId}}},
      { new: true, runValidators: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  /////// find a user, then remove friend from user //////////
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: { friendsId: params.friendsId}}},
      )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
    }
  };

module.exports = userController;