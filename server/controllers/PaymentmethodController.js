const PaymentmethodModel = require('../models/Paymentmethod');

const PaymentmethodController = {

  find: async (req, res) => {
    const { id } = req.params;
    try {
      const data = await PaymentmethodModel.findById(id)
			
      res.status(200).send(data);
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err);
    }
  },

  // REMOVE TO ENABLE PAGINATION
  all: async (req, res) => {
    try {
      const data = await PaymentmethodModel.find()
			
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
      results.results = await Paymentmethod.find()
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
    app.get('/paymentmethods', PaymentmethodController.all);

  with:
    app.get('/paymentmethods', PaymentmethodController.all, (req, res) => {
      res.json(res.paginatedResults.results);
    });
  */

  create: async (req, res) => {
		const { number, name, expiration_date, CVV, user } = req.body;
		const paymentmethod = new PaymentmethodModel({ number: number, name: name, expiration_date: expiration_date, CVV: CVV, user: user});
    try {
      await paymentmethod.save();
      res.status(200).send('data created!');
      console.log('Payment Method created!');
    } catch (err) {
      res.status(500).json({ message: err });
      console.log(err);
    }
  },

  update: async (req, res) => {
    const { id } = req.params;
			
    PaymentmethodModel.findByIdAndUpdate(id, 
    {
			number: req.body.number,
			name: req.body.name,
			expiration_date: req.body.expiration_date,
			CVV: req.body.CVV,
    },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
        console.log(err);
      } else {
        res.status(200).send(data);
        console.log('Paymentmethod updated!');
      }
    })
  },

  delete: async (req, res) => {
    const { id } = req.params;
    try {
			
      PaymentmethodModel.findByIdAndDelete(id).exec();
      res.status(200).send('Paymentmethod deleted');
      console.log('Paymentmethod deleted!');
    } catch (err) {
      res.status(400).send(err.message);
      console.log(err);
    }
  },


}

module.exports = PaymentmethodController;