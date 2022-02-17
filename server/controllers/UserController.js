const UserModel = require('../models/User');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

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

  // REMOVE TO ENABLE PAGINATION
  // FOR TESTING RIGHT NOW
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

  // UNCOMMENT AND FOLLOW INSTRUCTIONS TO ENABLE PAGINATION
  /*
  all: async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skipIndex = (page - 1) * limit;
    const results = {};

    try {
      results.results = await User.find()
        .sort({ _id: 1 })
        .limit(limit)
        .skip(skipIndex)
        .exec();
      res.paginatedResults = results;
      next();
    } catch (e) {
      res.status(500).json({ message: "Error Occured" });
    }
  }, 
  */

  /* INSTRUCTIONS
  in index.js, replace:
    app.get('/users', UserController.all);

  with:
    app.get('/users', UserController.all, (req, res) => {
      res.json(res.paginatedResults.results);
    });
  */

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


  login: async (req, res) => {
    const user = await UserModel.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: "Invalid username" });

    const checkpassword = await bcrypt.compare(req.body.password, user.password);
    if (!checkpassword) return res.status(400).json({ message: "Incorrect password" });

    const payload = {
      id: user._id.toString(),
      username: user.username,
    }
    jwt.sign(
      payload,
      "pleasechange", { expiresIn: 86400 },
      (err, token) => {
        if (err) return res.json({ message: err });
        return res.json({
          user: user._doc,
          token: "Bearer " + token
        });
      }
    );
  },

  register: async (req, res) => {
    const user = req.body;      
    const takenUsername = await UserModel.findOne({ username: user.username });
    const takenEmail = await UserModel.findOne({ email: user.email });

    if (takenUsername) {
      res.status(400).json({ message: "Username already taken" });
    } else if (takenEmail) {
      res.status(400).json({ message: "Email already exists" });
    } else {
      user.password = await bcrypt.hash(req.body.password, 10);
      user.email = user.email.toLowerCase();
      user.username = user.username.toLowerCase();
      const dbUser = new UserModel(user);
      dbUser.save();
      res.json({ message: "Success" });
    }
  }}

module.exports = UserController;