import React from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function UserNew() {
  const navigate = useNavigate();

	const handleSubmit = (name, username, email, password, charity) => {
		axios.post('http://localhost:8080/register', {
				name: name,
				username: username,
				email: email,
				password: password,
				charity: charity,
    })
    .then(res => {
      navigate("/users")
    })
    .catch(err => {
      alert(err)
    })
	};

	return (
		<div className='container'>
			<h1>New User</h1>
			<ValidatedForm 
        submit={(name, username, email, password, charity) => {
          handleSubmit(name, username, email, password, charity)
        }}/>
		</div>
	)
}
