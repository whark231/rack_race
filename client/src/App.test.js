/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen, keyboard } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";

import renderer from "react-test-renderer";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
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
import { UserContext } from './hooks/UserContext';
import useFindUser from './hooks/useFindUser';
import Login from './Auth/Login';
import Nav from './Components/Nav'
import './App.css';
import PrivateRoute from "./Auth/PrivateRoute";
import Settings from "./Pages/User/Settings";
import Wallet from "./Pages/User/Wallet";
