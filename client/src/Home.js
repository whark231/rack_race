import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';

export default function Home() {

	//ONCE WE MAKE BACKEND CONNECTION WE WILL MAKE TOP 10 DATA ARRAY FROM REAL INFO

	const data = [
		{ username: "rickster", hours: 16, moneyWon: "$103" },
		{ username: "harkless", hours: 17, moneyWon: "$91" },
		{ username: "fitzpatrick", hours: 15, moneyWon: "$85"},
		{ username: "doeJohn", hours: 14, moneyWon: "$84"},
		{ username: "jonDoe", hours: 15, moneyWon: "$82"},
		{ username: "rajonDoe", hours: 12, moneyWon: "$72"},
		{ username: "iwantDoe", hours: 11, moneyWon: "$65"},
		{ username: "aisha", hours: 10, moneyWon: "$57"},
		{ username: "dtran", hours: 9, moneyWon: "$53"},
		{ username: "travisYML", hours: 8, moneyWon: "$50"},

	  ]

	return (
		<div className='App'>
			<h1>Welcome to Rack Race! Work hard and you can end up on our Leaderboard!</h1>

      {/* <div className='homeLinks'>
				<Link to='/users' style={{margin: 5}}>Users</Link>
				<Link to='/paymentmethods' style={{margin: 5}}>Paymentmethods</Link>
				<Link to='/monthlypledges' style={{margin: 5}}>Monthlypledges</Link>
				<Link to='/workoutplans' style={{margin: 5}}>Workoutplans</Link>
				<Link to='/workoutgroups' style={{margin: 5}}>Workoutgroups</Link>
      </div> */}

    <img
       src={'https://image.shutterstock.com/image-vector/gym-rat-body-building-training-260nw-350481560.jpg'}
	    alt ="hello"
        border="1px solid #ddd "
        border-radius=" 250px"
        padding="5px"
        margin-left="auto"
        margin-right="auto"
        width="20%"
        height="20%"
    />
	
      <table>
	  <tbody>
	  <tr>
          <th>Username</th>
          <th>Gym Hours Completed</th>
          <th>Money Earned</th>
        </tr>
        {data.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.username}</td>
              <td>{val.hours}</td>
              <td>{val.moneyWon}</td>
            </tr>
          )
        })}
		</tbody>
      </table>
		</div>
	);
}
