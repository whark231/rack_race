import React from 'react';
import { useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

export default function PaymentmethodNew() {
  const navigate = useNavigate();

	const handleSubmit = (number, name, expiration_date, CVV, user) => {
		axios.post(`${configData.SERVER_URL}/paymentmethods`, {
				number: number,
				name: name,
				expiration_date: expiration_date,
				CVV: CVV,
        user: user
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/users/${user}`)
    })
    .catch(err => {
      alert(JSON.stringify(err))
    })
	};

	return (
		<div className='container'>
			<h1>New Payment Method</h1>
			<ValidatedForm submit={(number, name, expiration_date, CVV, user) => handleSubmit(number, name, expiration_date, CVV, user)}/>
		</div>
	)
}
