import React from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function WorkoutplanNew() {
  const navigate = useNavigate();
  const { id } = localStorage.getItem("userId");
  
  const handleSubmit = (length, location, description, date, time) => {
      console.log(length);
      axios.post('http://localhost:8080/postnewworkout', {
            user_id : id,
            workout_length : length,
            location : location,
            description : description,
            date : date,
            time : time
    } , { headers: authHeader() })
    .then(res => {
        console.log("Workout created!");
     }).catch(err => {
        alert(err)
      })
    };


	return (
		<div className='container'>
			<h1>New Workout</h1>
            <ValidatedForm submit={(length, location, description, date, time) => handleSubmit(length, location, description, date, time)}/>
		</div>
	)
}
