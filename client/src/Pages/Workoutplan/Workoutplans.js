import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

export default function Workoutplans() {
  const [workoutplans, setWorkoutplans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${configData.SERVER_URL}/workoutplans`, { headers: authHeader() })
      .then((res) => {
        setWorkoutplans(res.data)
      });
  }, []);

  function handleDelete(id) {
    axios.delete(`${configData.SERVER_URL}/workoutplans/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  return (
    <div className='container'>
      <h1>Workoutplans</h1>
      <Button variant={"contained"} onClick={() => navigate("/workoutplans/new")}>new workoutplan</Button>

      <ul>
      {workoutplans.map((workoutplan, i) => (
        <div className="listItem" key={i}>
					<li key={i}>{workoutplan.target_days}</li>
          <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => navigate(`/workoutplans/${workoutplan._id}`)}>show</Button>
            <Button onClick={() => navigate(`/workoutplans/${workoutplan._id}/edit`)}>edit</Button>
            <Button color="error" onClick={() => handleDelete(workoutplan._id)}>delete</Button>
          </ButtonGroup>
        </div>
      ))}
      </ul>
    </div>
  )
}
