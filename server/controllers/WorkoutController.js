const WorkoutModel = require('../models/Workout');

const WorkoutController = {
    find: async (req, res) => {
        const { id } = req.params;
        try {
            const data = await WorkoutModel.findById(id).populate({ path: 'user', select: '_id name user' });
            res.status(200).send(data);
        } catch (err) {
            res.status(400).send(err.message);
            console.log(err);
        }
    }, 
    create: async (req, res) => {
		const { user , workout_length, location, description, date, time, } = req.body;
		const workout = new WorkoutModel({ user: user, workout_length: workout_length, location: location, description: description, date: date, time: time, });
        try {  
            await workout.save();
            res.status(200).send('data created!');
            console.log('Workout created!');
        } catch (err) {
            res.status(500).send(err);
            console.log(err);
        }
  },

    all: async (req, res) => {
        try {
        const data = await WorkoutModel.find()
                    .populate({ path: 'user', select: '_id name user' });
                
        res.status(200).send(data);
        } catch (err) {
        res.status(400).send(err.message);
        console.log(err);
        }
    }, 

    deleteAll: async (req, res) => {
        try {
        const data = await WorkoutModel.deleteMany();
                
        res.status(200).send(data);
        } catch (err) {
        res.status(400).send(err.message);
        console.log(err);
        }
    }, 
}

module.exports = WorkoutController;