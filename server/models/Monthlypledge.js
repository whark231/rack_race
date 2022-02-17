const mongoose = require('mongoose');

const MonthlypledgeSchema = new mongoose.Schema({
	payment_amount: {
		type: Number,
		required: true
	},
	active: {
		type: Boolean,
		required: true
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
})

MonthlypledgeSchema.virtual('workoutplans', {
	ref: 'Workoutplan',
	localField: '_id',
	foreignField: 'monthlypledge'
});

MonthlypledgeSchema.set('toObject', { virtuals: true });
MonthlypledgeSchema.set('toJSON', { virtuals: true });

const Monthlypledge = mongoose.model('Monthlypledge', MonthlypledgeSchema);
module.exports = Monthlypledge;
