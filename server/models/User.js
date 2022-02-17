const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	charity: {
		type: String,
		required: true
	},
	workoutgroups: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Workoutgroup'
		}
	],
	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	]
});

UserSchema.virtual('paymentmethods', {
	ref: 'Paymentmethod',
	localField: '_id',
	foreignField: 'user'
});

UserSchema.virtual('monthlypledges', {
	ref: 'Monthlypledge',
	localField: '_id',
	foreignField: 'user'
});

UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;
