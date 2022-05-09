import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

export default function WorkoutplanEdit() {
	const { id } = useParams();	
  const [workoutplan, setWorkoutplan] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
  const navigate = useNavigate();

	useEffect(() => {
		axios.get(`${configData.SERVER_URL}/workoutplans/${id}`, { headers: authHeader() })
		.then((res) => {
			setWorkoutplan(res.data);
			setLoading(false);
		})
		.catch((err) => {
			console.log(err);
			setError(err);
		});
	}, []);

	const handleSubmit = (target_days, curr_days_met, weekly_plan, monthlypledge) => {
    axios.put(`${configData.SERVER_URL}/workoutplans/${id}/edit`, {
				target_days: target_days,
				curr_days_met: curr_days_met,
				weekly_plan: weekly_plan,
				monthlypledge: monthlypledge,
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/workoutplans/${id}`)
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
				<h1>Edit Workoutplan</h1>
				<ValidatedForm submit={(target_days, curr_days_met, weekly_plan, monthlypledge) => handleSubmit(target_days, curr_days_met, weekly_plan, monthlypledge)} model={workoutplan}/>
			</div>
		)
	}
}
