const WorkoutModel = require('../models/Workout');

const WorkoutController = {
    find: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await WorkoutModel.findById(id)
            res.status(200).send(data);
        } catch (err) {
            res.status(400).send(err.message);
            console.log(err);
        }
    }, 
    create: async (req, res) => {
		const { user_id , workout_length, location, description, date, time, } = req.body;
        console.log("here!");
        console.log(workout_length);
		const workout = new WorkoutModel({ user_id: user_id, workout_length: workout_length, location: location, description: description, date: date, time: time, });
        try {  
            await workout.save();
            res.status(200).send('data created!');
            console.log('Workout created!');
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
  },
}

module.exports = WorkoutController;