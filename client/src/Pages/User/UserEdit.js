import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { Button, ButtonGroup, CircularProgress, TextField } from '@mui/material';
import '../../App.css';
import configData from '../../config.json'

export default function UserEdit() {
	const { id } = useParams();	
  const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
  const navigate = useNavigate();

	useEffect(() => {
		axios.get(`${configData.SERVER_URL}/users/${id}`, { headers: authHeader() })
		.then((res) => {
			setUser(res.data);
			setLoading(false);
		})
		.catch((err) => {
			console.log(err);
			setError(err);
		});
	}, []);

	const handleSubmit = (name, username, email, password, charity) => {
    axios.put(`${configData.SERVER_URL}/users/${id}/edit`, {
				name: name,
				username: username,
				email: email,
				password: password,
				charity: charity,
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/users/${id}`)
    })
    .catch(err => {
      alert(err)
    });
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (loading) {
		return <div>Loading...</div>;
	} else {
		return (
			<div className='container'>
				<h1>Edit Account Info</h1>
        <ValidatedForm 
          model={user}
          submit={(name, username, email, password, charity) => {
            handleSubmit(name, username, email, password, charity, username, email, password)
          }}/>
			</div>
		)
	}
}

const styles = {
  row: {
    display: "flex"
  },
  displayContainer: {
    marginRight: "2em"
  }
}