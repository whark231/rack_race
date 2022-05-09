import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import { UserContext } from '../../hooks/UserContext';
import '../../App.css';
import configData from '../../config.json'

export default function MonthlypledgeNew() {
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

	const handleSubmit = (payment_amount, active, user) => {
		axios.post(`${configData.SERVER_URL}/monthlypledges`, {
				payment_amount: payment_amount,
				active: active,
				user: user,
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/users/${authUser._id}`)
    })
    .catch(err => {
      alert(err)
    })
	};

	return (
		<div className='container'>
			<h1>New Monthly Pledge</h1>
			<ValidatedForm submit={(payment_amount, active, user) => handleSubmit(payment_amount, active, user)}/>
		</div>
	)
}
