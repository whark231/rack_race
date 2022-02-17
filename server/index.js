const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require("jsonwebtoken")

const app = express();
const PORT = 8080;

app.use( express.json() );
app.use( cors() );

mongoose.connect('mongodb+srv://rgon:Neutrino@neutrinov2.yajh4.mongodb.net/test', {
	useNewUrlParser: true,
});


function verifyJWT(req, res, next) {
  if (!req.headers["authorization"]) {
    return res.status(400).json({ message:"No Token Given", isLoggedIn: false });
  }

  const token = req.headers["authorization"].split(' ')[1];
  if (token) {
    jwt.verify(token, "pleasechange", (err, decoded) => {
      if (err) return res.status(500).json({ message: "Failure to Auth", isLoggedIn: false });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    })
  } else {
    return res.status(400).json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
}


// CONTROLLERS
const UserController = require('./controllers/UserController');
const PaymentmethodController = require('./controllers/PaymentmethodController');
const MonthlypledgeController = require('./controllers/MonthlypledgeController');
const WorkoutplanController = require('./controllers/WorkoutplanController');
const WorkoutgroupController = require('./controllers/WorkoutgroupController');


// ROUTES
// Users
app.get('/users/:id', verifyJWT, UserController.find);
app.get('/users', verifyJWT, UserController.all);
app.post('/search', verifyJWT, UserController.search);
app.put('/users/:id/edit', verifyJWT, UserController.update);
app.delete('/users/:id', verifyJWT, UserController.delete);
app.post('/users/:user_id/add-workoutgroup/:workoutgroup_id', verifyJWT, UserController.addWorkoutgroup);
app.post('/users/:user_id/drop-workoutgroup/:workoutgroup_id', verifyJWT, UserController.dropWorkoutgroup);
app.post('/users/:user_id/add-friend/:friend_id', verifyJWT, UserController.addFriend);
app.post('/users/:user_id/drop-friend/:friend_id', verifyJWT, UserController.dropFriend);

// PaymentMethods
app.get('/paymentmethods/:id', verifyJWT, PaymentmethodController.find);
app.get('/paymentmethods', verifyJWT, PaymentmethodController.all);
app.post('/paymentmethods', verifyJWT, PaymentmethodController.create);
app.put('/paymentmethods/:id/edit', verifyJWT, PaymentmethodController.update);
app.delete('/paymentmethods/:id', verifyJWT, PaymentmethodController.delete);

// MonthlyPledges
app.get('/monthlypledges/:id', verifyJWT,MonthlypledgeController.find);
app.get('/monthlypledges', verifyJWT,MonthlypledgeController.all);
app.post('/monthlypledges', verifyJWT, MonthlypledgeController.create);
app.put('/monthlypledges/:id/edit', verifyJWT, MonthlypledgeController.update);
app.delete('/monthlypledges/:id', verifyJWT, MonthlypledgeController.delete);

// WorkoutPlans
app.get('/workoutplans/:id', verifyJWT, WorkoutplanController.find);
app.get('/workoutplans', verifyJWT, WorkoutplanController.all);
app.post('/workoutplans', verifyJWT, WorkoutplanController.create);
app.put('/workoutplans/:id/edit', verifyJWT, WorkoutplanController.update);
app.delete('/workoutplans/:id', verifyJWT, WorkoutplanController.delete);

// WorkoutGroups
app.get('/workoutgroups/:id', verifyJWT, WorkoutgroupController.find);
app.get('/workoutgroups', verifyJWT, WorkoutgroupController.all);
app.post('/workoutgroups', verifyJWT, WorkoutgroupController.create);
app.put('/workoutgroups/:id/edit', verifyJWT, WorkoutgroupController.update);
app.delete('/workoutgroups/:id', verifyJWT, WorkoutgroupController.delete);
app.post('/workoutgroups/:workoutgroup_id/add-user/:user_id', verifyJWT, WorkoutgroupController.addUser);
app.post('/workoutgroups/:workoutgroup_id/drop-user/:user_id', verifyJWT, WorkoutgroupController.dropUser);

// AUTH
app.post('/login', UserController.login);
app.post('/register', UserController.register);

app.listen(
	PORT,
	console.log("Server running on http://localhost:8080...")
);