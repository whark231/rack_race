import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress, TextField } from '@mui/material';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function WorkoutplanShow(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [workoutplan, setWorkoutplan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:8080/workoutplans/${id}`, { headers: authHeader() })
    .then((res) => {
      if (res.status === 500) {
        setError(true);
      } else {
        setWorkoutplan(res.data);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError(err);
    });
  }, []);

  function handleDelete() {
    axios.delete(`http://localhost:8080/workoutplans/${id}`);
    navigate('/workoutplans');
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div className='container'>
        <div className='row'>
          <h1 className='paddedRight'>Workoutplan {id}</h1>

          <Button variant="outlined" style={{marginRight: 15}}
            onClick={() => navigate(`/workoutplans/${id}/edit`)}>edit
          </Button>
          <Button variant="contained" color="error" 
            onClick={handleDelete}>delete
          </Button>
        </div>

				<label>Target_Days: {workoutplan.target_days}</label>
				<label>Curr_Days_Met: {workoutplan.curr_days_met}</label>
				<label>Weekly_Plan: {workoutplan.weekly_plan}</label>
				<label>Monthlypledge: <Link to={`/monthlypledges/${workoutplan.monthlypledge}`}>{workoutplan.monthlypledge}</Link></label>

      </div>
    );
  }
}
