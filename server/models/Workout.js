const mongoose = require('mongoose');

const WorkoutSchema = new mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	workout_length: {
		type: Number,
		required: true
	},
	location: {
		type: String,
		required: true
	}, 
    description: {
		type: String,
		required: true
	},
    date: {
		type: Date,
		required: true
	},
    time: {
		type: String,
		required: true
	}
})


const Workout = mongoose.model('Workout', WorkoutSchema);
module.exports = Workout;

