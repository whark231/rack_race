import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress, TextField, styled } from '@mui/material';
import { UserContext } from '../../hooks/UserContext';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

const CustomButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#df1c2f",
  '&:hover': {
    backgroundColor: "#df1c2f",
  },
}));

export default function UserShow(props) {
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
	const [workoutgroupId, setWorkoutgroupId] = useState();
	const [userId, setUserId] = useState();

  useEffect(() => {
    axios.get(`${configData.SERVER_URL}/users/${id}`, { headers: authHeader() })
    .then((res) => {
      if (res.status === 500) {
        setError(true);
      } else {
        setUser(res.data);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError(err);
    });
  }, [id]);



  function addWorkoutgroup() {
    axios.post(`http://localhost:8080/users/${id}/add-workoutgroup/${workoutgroupId}`, {}, { headers: authHeader() })
    .catch((e) => {
      alert("error: " + e.response.data.message)
    })
    axios.post(`http://localhost:8080/workoutgroups/${workoutgroupId}/add-user/${id}`, {}, { headers: authHeader() })
    .catch((e) => {
      alert("error: " + e.response.data.message)
    })
    window.location.reload();
  }

  function dropWorkoutgroup(droppedId) {
    axios.post(`http://localhost:8080/users/${id}/drop-workoutgroup/${droppedId}`, {}, { headers: authHeader() })
    .catch((e) => {
      alert("error: " + e.response.data.message)
    })
    axios.post(`http://localhost:8080/workoutgroups/${droppedId}/drop-user/${id}`, {}, { headers: authHeader() })
    .catch((e) => {
      alert("error: " + e.response.data.message)
    })
    window.location.reload();
  }

  function addFriend() {
    axios.post(`http://localhost:8080/users/${authUser._id}/add-friend/${id}`, {}, { headers: authHeader() })
    .catch((e) => {
      console.log("error: " + e.response.data.message)
    });
    window.location.reload();
  }

  function dropFriend(droppedId) {
    axios.post(`http://localhost:8080/users/${id}/drop-friend/${droppedId}`, {}, { headers: authHeader() })
    .catch((e) => {
      console.log("error: " + e.response.data.message)
    })
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
          <h1 className='paddedRight'>{user.name}</h1>

          { authUser && authUser._id === id ?
            <div className='row'>
              <Button variant="outlined" style={{marginRight: 15}}
                onClick={() => navigate(`/settings`)} id = "settings">settings
              </Button>
            </div>
            :
            <Button variant="contained"
              onClick={addFriend}>add friend
            </Button>
          }
        </div>

        {/* DISPLAY USER INFO */}
				<label style={{fontWeight: "bold"}}>@{user.username}</label>
        {authUser && authUser._id === id &&
          <label>Email: {user.email}</label>}
        {authUser && authUser._id === id &&
          <label>Charity: {user.charity}</label>}


        {/* SHOW MONTHLY PLEDGES */}
        { authUser && authUser._id === id &&
        <div className='displayContainer'>
					<h3>Monthly Pledges</h3>
					<Button id = "pledge" variant='contained' onClick={() => navigate(`/users/${id}/monthlypledges/new`)}>New Monthly Pledge</Button>
					<ul>
					{user.monthlypledges && user.monthlypledges.map((monthlypledge, i) => (
						<div className='listItem' key={i}>
							<li>{monthlypledge.payment_amount}</li>
							<Button variant='outlined' size='small'
              id = "show"
								onClick={() => navigate(`/monthlypledges/${monthlypledge._id}`)}>show</Button>
						</div>
					))}
					</ul>
				</div>
        }

        {/* SHOW WORKOUT GROUPS */}
				<div className='displayContainer'>
					<h3>Workout Groups</h3>

          {(user.workoutgroups && user.workoutgroups.length > 0) ?
            <ul>
              {user.workoutgroups && user.workoutgroups.map((workoutgroup, i) => (
                <div className='listItem' key={i}>
                  <li>{workoutgroup.name}</li>
                  <ButtonGroup variant='outlined' size='small'>
                    <Button onClick={() => navigate(`/workoutgroups/${workoutgroup._id}`)}>show</Button>
                    <Button color='error' onClick={() => dropWorkoutgroup(workoutgroup._id)}>drop</Button>
                  </ButtonGroup>
                </div>
              ))}
            </ul>
            :
            <p>{(authUser && authUser._id === id) ? "you are" : "this user is"} currently in no groups</p>
          }


				</div>

        {/* SHOW FRIENDS */}
				<div className='displayContainer' style={{}}>
					<h3>Friends</h3>

          {(user.friends && user.friends.length > 0) ?
            <ul>
            {user.friends.map((user, i) => (
              <div className='listItem' key={i}>
                <li>{user.name}</li>
                <ButtonGroup variant='outlined' size='small'>
                  <Button onClick={() => navigate(`/users/${user._id}`)}>profile</Button>
                  <Button color='error' onClick={() => dropFriend(user._id)}>unfriend</Button>
                </ButtonGroup>
              </div>
            ))}
            </ul>
            :
            <p>{(authUser && authUser._id === id) ? "you have" : "this user has"} no friends!</p>
          }
				</div>
      </div>
    );
  }
}
