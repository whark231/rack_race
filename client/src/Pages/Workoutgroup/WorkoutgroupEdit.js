import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

export default function WorkoutgroupEdit() {
	const { id } = useParams();	
  const [workoutgroup, setWorkoutgroup] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
  const navigate = useNavigate();

	useEffect(() => {
		axios.get(`${configData.SERVER_URL}/workoutgroups/${id}`, { headers: authHeader() })
		.then((res) => {
			setWorkoutgroup(res.data);
			setLoading(false);
		})
		.catch((err) => {
			console.log(err);
			setError(err);
		});
	}, []);

	const handleSubmit = (name) => {
    axios.put(`${configData.SERVER_URL}/workoutgroups/${id}/edit`, {
				name: name,
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/workoutgroups/${id}`)
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
				<h1>Edit Workoutgroup</h1>
				<ValidatedForm submit={(name) => handleSubmit(name)} model={workoutgroup}/>
			</div>
		)
	}
}
