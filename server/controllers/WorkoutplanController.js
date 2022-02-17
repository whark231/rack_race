const WorkoutplanModel = require('../models/Workoutplan');

const WorkoutplanController = {

  find: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await WorkoutplanModel.findById(id)
			
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err);
    }
  },

  // REMOVE TO ENABLE PAGINATION
  all: async (req, res) => {
    try {
      const data = await WorkoutplanModel.find()
			
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
      results.results = await Workoutplan.find()
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
    app.get('/workoutplans', WorkoutplanController.all);

  with:
    app.get('/workoutplans', WorkoutplanController.all, (req, res) => {
      res.json(res.paginatedResults.results);
    });
  */

  create: async (req, res) => {
		const { target_days, curr_days_met, weekly_plan, monthlypledge, } = req.body;
		const workoutplan = new WorkoutplanModel({ target_days: target_days, curr_days_met: curr_days_met, weekly_plan: weekly_plan, monthlypledge: monthlypledge, });
    try {
			
      await workoutplan.save();
      res.status(200).send('data created!');
      console.log('Workoutplan created!');
    } catch (err) {
      res.status(500).send(err);
      console.log(err);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
			
    WorkoutplanModel.findByIdAndUpdate(id, 
    {
			target_days: req.body.target_days,
			curr_days_met: req.body.curr_days_met,
			weekly_plan: req.body.weekly_plan,
			monthlypledge: req.body.monthlypledge,
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else {
        res.status(200).send(data);
        console.log('Workoutplan updated!');
      }
    })
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
			
      WorkoutplanModel.findByIdAndDelete(id).exec();
      res.status(200).send('Workoutplan deleted');
      console.log('Workoutplan deleted!');
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err);
    }
  },


}

module.exports = WorkoutplanController;