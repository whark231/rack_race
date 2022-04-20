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

test("Home Page", () => {
  render(<Home />);
  const linkElement = screen.getByText("Welcome to Rack Race!");
  expect(linkElement).toBeInTheDocument();
});

describe("Login Page", () => {

  test("Username Form", () => {
    render(<Login />);
    const linkElement = screen.getByLabelText("username");
    expect(linkElement).toBeInTheDocument();
  });

  test("Password Form", () => {
    render(<Login />);
    const linkElement = screen.getByLabelText("password");
    expect(linkElement).toBeInTheDocument();
  });

  test("Login Button", () => {
    render(<Login />);
    const linkElement = screen.getByRole(role: "button");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toContain("LOGIN");
  });

});

describe("New User Page", () => {

  test("Title, () => {
    render(<UserNew/>);
    const linkElement = screen.getByText("New User");
    expect(linkElement).toBeInTheDocument();
  });

  test("Name Form", () => {
    render(<UserNew/>);
    const linkElement = screen.getByLabelText("name");
    expect(linkElement).toBeInTheDocument();
  });

  test("Username Form", () => {
    render(<UserNew />);
    const linkElement = screen.getByLabelText("username");
    expect(linkElement).toBeInTheDocument();
  });

  test("Email Form", () => {
    render(<UserNew />);
    const linkElement = screen.getByLabelText("email");
    expect(linkElement).toBeInTheDocument();
  });

  test("Password Form", () => {
    render(<UserNew />);
    const linkElement = screen.getByLabelText("password");
    expect(linkElement).toBeInTheDocument();
  });

  test("Charity Form", () => {
    render(<UserNew />);
    const linkElement = screen.getByLabelText("charity");
    expect(linkElement).toBeInTheDocument();
  });

  test("Submit Button", () => {
    render(<UserNew />);
    const linkElement = screen.getByRole(role: "button");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toContain("SUBMIT");
  });

  test("Snackbar on Submit", () => {
    render(<UserNew />);
    const linkElement = screen.getByRole(role: "button");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toContain("SUBMIT");
  });

});
