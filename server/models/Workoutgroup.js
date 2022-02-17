const mongoose = require('mongoose');

const WorkoutgroupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
})


const Workoutgroup = mongoose.model('Workoutgroup', WorkoutgroupSchema);
module.exports = Workoutgroup;
