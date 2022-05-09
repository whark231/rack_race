import React from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

export default function WorkoutplanNew() {
  const navigate = useNavigate();

	const handleSubmit = (target_days, curr_days_met, weekly_plan, monthlypledge) => {
		axios.post(`${configData.SERVER_URL}/workoutplans`, {
				target_days: target_days,
				curr_days_met: curr_days_met,
				weekly_plan: weekly_plan,
				monthlypledge: monthlypledge,
    }, { headers: authHeader() })
    .then(res => {
      navigate("/workoutplans")
    })
    .catch(err => {
      alert(err)
    })
	};

	return (
		<div className='container'>
			<h1>New Workoutplan</h1>
			<ValidatedForm submit={(target_days, curr_days_met, weekly_plan, monthlypledge) => handleSubmit(target_days, curr_days_met, weekly_plan, monthlypledge)}/>
		</div>
	)
}
