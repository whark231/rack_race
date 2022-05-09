const express       = require('express');
const router        = express.Router();
module.exports      = router;
const { verifyJWT } = require('./middlewares')
const {
  UserController,
  PaymentmethodController,
  MonthlypledgeController,
  WorkoutgroupController,
  WorkoutplanController,
  AuthController
} = require('../controllers');


// Home
router.get('/', (_req, res) => {
  res.status(200).send({ message: 'Welcome to Rack Race!' });
})

// Users
router.get('/users/:id', verifyJWT, UserController.find);
router.get('/users', verifyJWT, UserController.all);
router.post('/search', verifyJWT, UserController.search);
router.put('/users/:id/edit', verifyJWT, UserController.update);
router.delete('/users/:id', verifyJWT, UserController.delete);
router.post('/users/:user_id/add-workoutgroup/:workoutgroup_id', verifyJWT, UserController.addWorkoutgroup);
router.post('/users/:user_id/drop-workoutgroup/:workoutgroup_id', verifyJWT, UserController.dropWorkoutgroup);
router.post('/users/:user_id/add-friend/:friend_id', verifyJWT, UserController.addFriend);
router.post('/users/:user_id/drop-friend/:friend_id', verifyJWT, UserController.dropFriend);

// PaymentMethods
router.get('/paymentmethods/:id', verifyJWT, PaymentmethodController.find);
router.get('/paymentmethods', verifyJWT, PaymentmethodController.all);
router.post('/paymentmethods', verifyJWT, PaymentmethodController.create);
router.put('/paymentmethods/:id/edit', verifyJWT, PaymentmethodController.update);
router.delete('/paymentmethods/:id', verifyJWT, PaymentmethodController.delete);

// MonthlyPledges
router.get('/monthlypledges/:id', verifyJWT,MonthlypledgeController.find);
router.get('/monthlypledges', verifyJWT,MonthlypledgeController.all);
router.post('/monthlypledges', verifyJWT, MonthlypledgeController.create);
router.put('/monthlypledges/:id/edit', verifyJWT, MonthlypledgeController.update);
router.delete('/monthlypledges/:id', verifyJWT, MonthlypledgeController.delete);

// WorkoutPlans
router.get('/workoutplans/:id', verifyJWT, WorkoutplanController.find);
router.get('/workoutplans', WorkoutplanController.all);
router.post('/workoutplans', verifyJWT, WorkoutplanController.create);
router.put('/workoutplans/:id/edit', verifyJWT, WorkoutplanController.update);
router.delete('/workoutplans/:id', verifyJWT, WorkoutplanController.delete);

// WorkoutGroups
router.get('/workoutgroups/:id', verifyJWT, WorkoutgroupController.find);
router.get('/workoutgroups', verifyJWT, WorkoutgroupController.all);
router.post('/workoutgroups', verifyJWT, WorkoutgroupController.create);
router.put('/workoutgroups/:id/edit', verifyJWT, WorkoutgroupController.update);
router.delete('/workoutgroups/:id', verifyJWT, WorkoutgroupController.delete);
router.post('/workoutgroups/:workoutgroup_id/add-user/:user_id', verifyJWT, WorkoutgroupController.addUser);
router.post('/workoutgroups/:workoutgroup_id/drop-user/:user_id', verifyJWT, WorkoutgroupController.dropUser);

// Auth
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.put('/forgotpassword', AuthController.forgotPassword);
router.put('/resetpassword', AuthController.resetPassword);
router.get('/users/:id/verify/:token', AuthController.verifyEmail);

// Default response for any other request
router.use((_req, res) => {
  res.status(404).send({ message: "404 not found" });
});