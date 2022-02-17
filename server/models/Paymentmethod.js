const mongoose = require('mongoose');

const PaymentmethodSchema = new mongoose.Schema({
	number: {
		type: Number,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	expiration_date: {
		type: String,
		required: true
	},
	CVV: {
		type: Number,
		required: true
	},
  user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
})


const Paymentmethod = mongoose.model('Paymentmethod', PaymentmethodSchema);
module.exports = Paymentmethod;
