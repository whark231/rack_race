import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from './Home';
import Users from './Pages/User/Users';
import UserNew from './Pages/User/UserNew';
import UserShow from './Pages/User/UserShow';
import UserEdit from './Pages/User/UserEdit';
import Paymentmethods from './Pages/Paymentmethod/Paymentmethods';
import PaymentmethodNew from './Pages/Paymentmethod/PaymentmethodNew';
import PaymentmethodShow from './Pages/Paymentmethod/PaymentmethodShow';
import PaymentmethodEdit from './Pages/Paymentmethod/PaymentmethodEdit';
import Monthlypledges from './Pages/Monthlypledge/Monthlypledges';
import MonthlypledgeNew from './Pages/Monthlypledge/MonthlypledgeNew';
import MonthlypledgeShow from './Pages/Monthlypledge/MonthlypledgeShow';
import MonthlypledgeEdit from './Pages/Monthlypledge/MonthlypledgeEdit';
import Workoutplans from './Pages/Workoutplan/Workoutplans';
import WorkoutplanNew from './Pages/Workoutplan/WorkoutplanNew';
import WorkoutplanShow from './Pages/Workoutplan/WorkoutplanShow';
import WorkoutplanEdit from './Pages/Workoutplan/WorkoutplanEdit';
import Workoutgroups from './Pages/Workoutgroup/Workoutgroups';
import WorkoutgroupNew from './Pages/Workoutgroup/WorkoutgroupNew';
import WorkoutgroupShow from './Pages/Workoutgroup/WorkoutgroupShow';
import WorkoutgroupEdit from './Pages/Workoutgroup/WorkoutgroupEdit';
import WorkoutNew from './Pages/Workout/WorkoutNew';
import { UserContext } from './hooks/UserContext';
import useFindUser from './hooks/useFindUser';
import Login from './Auth/Login';
import Nav from './Components/Nav'
import './App.css';
import PrivateRoute from "./Auth/PrivateRoute";
import Settings from "./Pages/User/Settings";
import Wallet from "./Pages/User/Wallet";


function App() {
	const { user, setUser } = useFindUser();

  return (
		<UserContext.Provider value={{ authUser: user, setAuthUser: setUser }}>
    <div className="App">
      {/* NAVBAR */}
			<Nav/>

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login />} />
				<Route path='/register' element={<UserNew />} />

        {/* PRIVATE ROUTES */}
        <Route
          path="/settings"
          element={ <PrivateRoute component={<Settings />} />}/>
        <Route
          path="/settings/wallet"
          element={ <PrivateRoute component={<Wallet />} />}/>
        <Route
          path="/users"
          element={ <PrivateRoute component={<Users />} />}/>
        <Route
          path="/users/:id"
          element={ <PrivateRoute component={<UserShow />} />}/>
        <Route
          path="/users/:id/edit"
          element={ <PrivateRoute component={<UserEdit />} />}/>
        <Route
          path="/users/:id/paymentmethods/new"
          element={ <PrivateRoute component={<PaymentmethodNew />} />}/>
        <Route
          path="/paymentmethods/:id"
          element={ <PrivateRoute component={<PaymentmethodShow />} />}/>
        <Route
          path="/paymentmethods/:id/edit"
          element={ <PrivateRoute component={<PaymentmethodEdit />} />}/>
        <Route
          path="/paymentmethods/new"
          element={ <PrivateRoute component={<PaymentmethodNew />} />}/>
        <Route
          path="/monthlypledges/:id"
          element={ <PrivateRoute component={<MonthlypledgeShow />} />}/>
        <Route
          path="/monthlypledges/:id/edit"
          element={ <PrivateRoute component={<MonthlypledgeEdit />} />}/>
        <Route
          path="/users/:id/monthlypledges/new"
          element={ <PrivateRoute component={<MonthlypledgeNew />} />}/>
        <Route
          path="/workoutplans/:id"
          element={ <PrivateRoute component={<WorkoutplanShow />} />}/>
        <Route
          path="/workoutplans/:id/edit"
          element={ <PrivateRoute component={<WorkoutplanEdit />} />}/>
        <Route
          path="/monthlypledges/:id/workoutplans/new"
          element={ <PrivateRoute component={<WorkoutplanNew />} />}/>
        <Route
          path="/workoutgroups"
          element={ <PrivateRoute component={<Workoutgroups />} />}/>
        <Route
          path="/workoutgroups/new"
          element={ <PrivateRoute component={<WorkoutgroupNew />} />}/>
        <Route
          path="/workoutgroups/:id"
          element={ <PrivateRoute component={<WorkoutgroupShow />} />}/>
        <Route
          path="/workoutgroups/:id/edit"
          element={ <PrivateRoute component={<WorkoutgroupEdit />} />}/>
       <Route
          path="/workoutnew"
          element={ <PrivateRoute component={<WorkoutNew />} />}/>
      </Routes>  
    </div>
		</UserContext.Provider>
  );
}

export default App;
