import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress, TextField } from '@mui/material';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function MonthlypledgeShow(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [monthlypledge, setMonthlypledge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/monthlypledges/${id}`, { headers: authHeader() })
    .then((res) => {
      if (res.status === 500) {
        setError(true);
      } else {
        setMonthlypledge(res.data);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError(err);
    });
  }, []);

  function handleDelete() {
    axios.delete(`http://localhost:8080/monthlypledges/${id}`);
    navigate('/monthlypledges');
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div className='container'>
        <div className='row'>
          <h1 className='paddedRight'>Monthly Pledge: ${monthlypledge.payment_amount}</h1>

          <Button variant="outlined" style={{marginRight: 15}}
            onClick={() => navigate(`/monthlypledges/${id}/edit`)}>edit
          </Button>
          <Button variant="contained" color="error" 
            onClick={handleDelete}>delete
          </Button>
        </div>

				<label>Active: {monthlypledge.active  ? 'true' : 'false'}</label>
				<label>User: <Link to={`/users/${monthlypledge.user}`}>{monthlypledge.user}</Link></label>

				<div className='displayContainer'>
					<h3>Workout Plans</h3>
					<Button variant='contained' onClick={() => navigate(`/monthlypledges/${id}/workoutplans/new`)}>New Workoutplan</Button>
					<ul>
					{monthlypledge.workoutplans && monthlypledge.workoutplans.map((workoutplan, i) => (
						<div className='listItem' key={i}>
							<li>{workoutplan.target_days}</li>
							<Button variant='outlined' size='small'
								onClick={() => navigate(`/workoutplans/${workoutplan._id}`)}>show</Button>
						</div>
					))}
					</ul>
				</div>
      </div>
    );
  }
}
