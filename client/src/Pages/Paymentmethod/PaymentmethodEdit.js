import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

export default function PaymentmethodEdit() {
	const { id } = useParams();	
  const [paymentmethod, setPaymentmethod] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
  const navigate = useNavigate();

	useEffect(() => {
		axios.get(`${configData.SERVER_URL}/paymentmethods/${id}`, { headers: authHeader() })
		.then((res) => {
			setPaymentmethod(res.data);
			setLoading(false);
		})
		.catch((err) => {
			console.log(err);
			setError(err);
		});
	}, []);

	const handleSubmit = (number, name, expiration_date, CVV) => {
    axios.put(`${configData.SERVER_URL}/paymentmethods/${id}/edit`, {
				number: number,
				name: name,
				expiration_date: expiration_date,
				CVV: CVV,
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/paymentmethods/${id}`)
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
				<h1>Edit Payment Method</h1>
				<ValidatedForm submit={(number, name, expiration_date, CVV) => handleSubmit(number, name, expiration_date, CVV)} model={paymentmethod}/>
			</div>
		)
	}
}
