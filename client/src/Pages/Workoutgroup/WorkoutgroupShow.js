import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress, TextField } from '@mui/material';
import { UserContext } from '../../hooks/UserContext';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

export default function WorkoutgroupShow(props) {
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [workoutgroup, setWorkoutgroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
	const [userId, setUserId] = useState();

  useEffect(() => {
    axios.get(`${configData.SERVER_URL}/workoutgroups/${id}`, { headers: authHeader() })
    .then((res) => {
      if (res.status === 500) {
        setError(true);
      } else {
        setWorkoutgroup(res.data);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError(err);
    });
  }, [id]);

  function handleDelete() {
    axios.delete(`http://localhost:8080/workoutgroups/${id}`, { headers: authHeader() });
    navigate('/workoutgroups');
  }

  function addMember() {
    axios.post(`http://localhost:8080/workoutgroups/${id}/add-user/${authUser._id}`, {}, { headers: authHeader() })
    .catch((e) => { 
      console.log("error: " + e.response.data.message) 
    });
    axios.post(`http://localhost:8080/users/${authUser._id}/add-workoutgroup/${id}`, {}, { headers: authHeader() })
    .catch((e) => { 
      console.log("error: " + e.response.data.message) 
    });
    window.location.reload();
  }

  function dropMember(droppedId) {
    axios.post(`http://localhost:8080/workoutgroups/${id}/drop-user/${droppedId}`, {}, { headers: authHeader() })
    .catch((e) => { 
      console.log("error: " + e.response.data.message) 
    });
    axios.post(`http://localhost:8080/users/${droppedId}/drop-workoutgroup/${id}`, {}, { headers: authHeader() })
    .catch((e) => { 
      console.log("error: " + e.response.data.message) 
    });
    window.location.reload();
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div className='container'>
        <div className='row'>
          <h1 className='paddedRight'>{workoutgroup && workoutgroup.name}</h1>
          <Button variant="outlined" style={{marginRight: 15}}
            onClick={addMember}>join
          </Button>
          <Button variant="outlined" style={{marginRight: 15}}
            onClick={() => navigate(`/workoutgroups/${id}/edit`)}>edit
          </Button>
          <Button variant="contained" color="error" 
            onClick={handleDelete}>delete
          </Button>
        </div>


        {/* DISPLAY MEMBERS */}
				<div className='displayContainer'>
					<h3>Members</h3>
					<div className='row'>
						<TextField
							label='user id' size='small' style={{marginRight: 10}}
							onChange={(e) => { setUserId(e.target.value) }}
						/>
						<Button variant='contained' onClick={addMember}>Add User</Button>
					</div>
					<ul>
					{workoutgroup.users && workoutgroup.users.map((user, i) => (
						<div className='listItem' key={i}>
							<li>{user.name}</li>
							<ButtonGroup variant='outlined' size='small'>
								<Button onClick={() => navigate(`/users/${user._id}`)}>show</Button>
								<Button color='error' onClick={() => dropMember(user._id)}>drop</Button>
							</ButtonGroup>
						</div>
					))}
					</ul>
				</div>
      </div>
    );
  }
}
