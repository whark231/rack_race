import React from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function WorkoutgroupNew() {
  const navigate = useNavigate();

	const handleSubmit = (name) => {
		axios.post('http://localhost:8080/workoutgroups', {
				name: name,
    }, { headers: authHeader() })
    .then(res => {
      navigate("/workoutgroups")
    })
    .catch(err => {
      alert(err)
    })
	};

	return (
		<div className='container'>
			<h1>New Workoutgroup</h1>
			<ValidatedForm submit={(name) => handleSubmit(name)}/>
		</div>
	)
}
