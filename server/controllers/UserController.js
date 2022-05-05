const UserModel = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const invalidPassword = require('../util/validatePassword')

const UserController = {

  find: async (req, res) => {
    const { id } = req.params;
    try {
      let data = await UserModel.findById(id)
      if (req.user.id == data._id.toString()) {
        data = await UserModel.findById(id)
				.populate({ path: 'paymentmethods', select: 'number name expiration_date CVV' })
				.populate({ path: 'workoutgroups', select: 'name' })
				.populate({ path: 'friends', select: 'name username email password charity' })
				.populate({ path: 'monthlypledges', select: 'payment_amount active' })
      } else {
        data = await UserModel.findById(id)
				.populate({ path: 'workoutgroups', select: 'name' })
				.populate({ path: 'friends', select: 'name username email password charity' })
        data.email = undefined;
        data.charity = undefined;
      }
      data.password = undefined;

      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err);
    }
  },

  search: async (req, res) => {
    const queryString = req.body.query;
    const queryStrings = queryString.split(" ");
    let allQueries = [];
    queryStrings.forEach(element => {
        allQueries.push({name : {$regex : String(element), $options : "i"}})
    });
    const allUsers = await UserModel.find({$or : allQueries})
    if(!allUsers || allUsers.length === 0) {
      res.status(400).json({ message: "No users found" })
    } else {
      res.status(200).send(allUsers)
    }
  },

  all: async (req, res) => {
    try {
      const data = await UserModel.find()
				.populate({ path: 'paymentmethods', select: 'number name expiration_date CVV' })
				.populate({ path: 'workoutgroups', select: 'name' })
				.populate({ path: 'friends', select: 'name username email password charity' })
				.populate({ path: 'monthlypledges', select: 'payment_amount active' })
			
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err);
    }
  }, 

  create: async (req, res) => {
		const { name, username, email, password, charity } = req.body;
		const user = new UserModel({ name: name, username: username, email: email, password: password, charity: charity });
    try {
      await user.save();
      res.status(200).send('data created!');
      console.log('User created!');
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Password validation
    if (req.body.password && invalidPassword(req.body.password)) {
      return res.status(400).json({ message: invalidPassword(req.body.password) });
    }
			
    UserModel.findByIdAndUpdate(id, 
    {
			name: req.body.name,
			username: req.body.username,
			email: req.body.email,
			password: hashedPassword,
			charity: req.body.charity,
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else {
        res.status(200).send(data);
        console.log('User updated!');
      }
    })
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
			
      UserModel.findByIdAndDelete(id).exec();
      res.status(200).send('User deleted');
      console.log('User deleted!');
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err);
    }
  },

  addWorkoutgroup: async (req, res) => {
    const { user_id, workoutgroup_id } = req.params;
    UserModel.findByIdAndUpdate(
      user_id, 
      { $push: { workoutgroups: workoutgroup_id } },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
          console.log(err);
        } else {
          res.status(200).send(data);
          console.log('Workoutgroup added!');
        }
      }
    )
  },

  dropWorkoutgroup: async (req, res) => {
    const { user_id, workoutgroup_id } = req.params;
    UserModel.findByIdAndUpdate(
      user_id, 
      { $pull: { workoutgroups: workoutgroup_id } },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
          console.log(err);
        } else {
          res.status(200).send(data);
          console.log('Workoutgroup dropped!');
        }
      }
    )
  },

  addFriend: async (req, res) => {
    const { user_id, friend_id } = req.params;
    UserModel.findByIdAndUpdate(
      user_id, 
      { $push: { friends: friend_id } },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
          console.log(err);
        } else {
          res.status(200).send(data);
          console.log('User added!');
        }
      }
    )
  },

  dropFriend: async (req, res) => {
    const { user_id, friend_id } = req.params;
    UserModel.findByIdAndUpdate(
      user_id, 
      { $pull: { friends: friend_id } },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
          console.log(err);
        } else {
          res.status(200).send(data);
          console.log('Friend dropped');
        }
      }
    )
  },
}

module.exports = UserController;