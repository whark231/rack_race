import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function Workoutgroups() {
  const [workoutgroups, setWorkoutgroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/workoutgroups", { headers: authHeader() })
      .then((res) => {
        setWorkoutgroups(res.data)
      });
  }, []);

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/workoutgroups/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  return (
    <div className='container'>
      <h1>Workout Groups</h1>
      <Button variant={"contained"} onClick={() => navigate("/workoutgroups/new")}>new workout group</Button>

      <ul>
      {workoutgroups.map((workoutgroup, i) => (
        <div className="listItem" key={i}>
					<li key={i}>{workoutgroup.name}</li>
          <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => navigate(`/workoutgroups/${workoutgroup._id}`)}>show</Button>
            <Button onClick={() => navigate(`/workoutgroups/${workoutgroup._id}/edit`)}>edit</Button>
            <Button color="error" onClick={() => handleDelete(workoutgroup._id)}>delete</Button>
          </ButtonGroup>
        </div>
      ))}
      </ul>
    </div>
  )
}
