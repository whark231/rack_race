const WorkoutgroupModel = require('../models/Workoutgroup');

const WorkoutgroupController = {

  find: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await WorkoutgroupModel.findById(id)
				.populate({ path: 'users', select: 'name username email password charity username email password' })
			
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err);
    }
  },

  // REMOVE TO ENABLE PAGINATION
  all: async (req, res) => {
    try {
      const data = await WorkoutgroupModel.find()
				.populate({ path: 'users', select: 'name username email password charity username email password' })
			
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
      results.results = await Workoutgroup.find()
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
    app.get('/workoutgroups', WorkoutgroupController.all);

  with:
    app.get('/workoutgroups', WorkoutgroupController.all, (req, res) => {
      res.json(res.paginatedResults.results);
    });
  */

  create: async (req, res) => {
		const { name, } = req.body;
		const workoutgroup = new WorkoutgroupModel({ name: name, });
    try {
			
      await workoutgroup.save();
      res.status(200).send('data created!');
      console.log('Workoutgroup created!');
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
			
    WorkoutgroupModel.findByIdAndUpdate(id, 
    {
			name: req.body.name,
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else {
        res.status(200).send(data);
        console.log('Workoutgroup updated!');
      }
    })
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
			
      WorkoutgroupModel.findByIdAndDelete(id).exec();
      res.status(200).send('Workoutgroup deleted');
      console.log('Workoutgroup deleted!');
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err);
    }
  },

  addUser: async (req, res) => {
    const { workoutgroup_id, user_id } = req.params;
    WorkoutgroupModel.findByIdAndUpdate(
      workoutgroup_id, 
      { $push: { users: user_id } },
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

  dropUser: async (req, res) => {
    const { workoutgroup_id, user_id } = req.params;
    WorkoutgroupModel.findByIdAndUpdate(
      workoutgroup_id, 
      { $pull: { users: user_id } },
      (err, data) => {
        if (err) {
          res.status(500).send(err);
          console.log(err);
        } else {
          res.status(200).send(data);
          console.log('User dropped!');
        }
      }
    )
  },


}

module.exports = WorkoutgroupController;