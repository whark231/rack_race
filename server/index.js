const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const {
  verifyJWT
} = require('./middlewares');

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
  origin: "*"
}

// CONTROLLERS
const {
  UserController,
  PaymentmethodController,
  MonthlypledgeController,
  WorkoutgroupController,
  WorkoutplanController,
  AuthController,
  WorkoutController,
} = require("./controllers");

// MIDDLEWARE 
app.use( express.json() );
app.use( cors(corsOptions) );

// MONGO DB CONNECTION
mongoose
  .connect(process.env.DB_CONNECTION, {
	  useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB connection successful");
  })
  .catch(err => {
    console.log(err.stack);
    process.exit(1);
  }
);


/* 
 * ROUTES 
 */

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
app.get('/workoutplans', WorkoutplanController.all);
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
app.post('/login', AuthController.login);
app.post('/register', AuthController.register);
app.put('/forgotpassword', AuthController.forgotPassword);
app.put('/resetpassword', AuthController.resetPassword);

// Workout
app.post('/workout/postnewworkout', WorkoutController.create);
app.get('/workout/getfeedworkouts', WorkoutController.all);
app.delete('/workout/deleteAll', WorkoutController.deleteAll);

// Default response for any other request
app.use((_req, res) => {
  res.status(404).send({ message: "404 not found" });
});

app.listen(
	PORT,
	console.log(`Server running on http://localhost:${PORT}...`)
);