import React from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function WorkoutplanNew() {
  const navigate = useNavigate();

	return (
		<div className='container'>
			<h1>New Workout</h1>
		</div>
	)
}
