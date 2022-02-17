const mongoose = require('mongoose');

const WorkoutplanSchema = new mongoose.Schema({
	target_days: {
		type: Number,
		required: true
	},
	curr_days_met: {
		type: Number,
		required: true
	},
	weekly_plan: {
		type: String,
		required: true
	},
	monthlypledge: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Monthlypledge',
		required: true
	},
})


const Workoutplan = mongoose.model('Workoutplan', WorkoutplanSchema);
module.exports = Workoutplan;
