const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

   // Update a user
   updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      console.log(req.params.userId),
      { $set: req.body },
      console.log(req.body),
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: 'User and thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  // Add new friend
  

    addFriend(req, res) {
      console.log(req.body);
      User.findOneAndUpdate(
        { _id: req.params.userId},
        { $addToSet: { friends:req.params.friendId } },
        { runValidators: true, new: true }
      )
        .then((user) =>
          !user
            ? res
                .status(404)
                .json({ message: 'No student found with that ID :(' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
    
  
  
  // Delete a friend
  // deleteFriend(req, res) {
  //   User.findOneAndUpdate({ _id: req.params.userId })
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({ message: 'No such friends exists' })
  //         : User.findOneAndUpdate(
  //           { _id: req.params.friendId },
  //             { $pull: { friends: { id: req.params.friendId } } },
  //             { runValidators: true, new: true }
  //           )
  //     )
  //     .then((user) =>
  //       !user
  //         ? res.status(404).json({
  //             message: 'Thought deleted, but no courses found',
              
  //           })
  //         : res.json({ message: 'Thought successfully deleted' })
  //     )
  //     .catch((err) => {
  //       console.log(err);
  //       res.status(500).json(err);
  //     });
  // },

  
  // Remove reaction
  deleteFriend(req, res) {
  User.findOneAndUpdate(
    { _id: req.params.userId },
    { $pullAll: { friends: [req.params.friendId]  } },
    { runValidators: true, new: true }
  )
    .then((user) =>
      !user
        ? res
            .status(404)
            .json({ message: 'No student found with that ID :(' })
        : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
}


  
};
