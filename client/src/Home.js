import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function Home() {
	return (
		<div className='App'>
			<h1>Welcome to Rack Race!</h1>

      {/* <div className='homeLinks'>
				<Link to='/users' style={{margin: 5}}>Users</Link>
				<Link to='/paymentmethods' style={{margin: 5}}>Paymentmethods</Link>
				<Link to='/monthlypledges' style={{margin: 5}}>Monthlypledges</Link>
				<Link to='/workoutplans' style={{margin: 5}}>Workoutplans</Link>
				<Link to='/workoutgroups' style={{margin: 5}}>Workoutgroups</Link>
      </div> */}
		</div>
	);
}
