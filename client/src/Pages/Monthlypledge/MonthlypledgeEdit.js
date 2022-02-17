import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ValidatedForm from './ValidatedForm';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function MonthlypledgeEdit() {
	const { id } = useParams();	
  const [monthlypledge, setMonthlypledge] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
  const navigate = useNavigate();

	useEffect(() => {
		axios.get(`http://localhost:8080/monthlypledges/${id}`, { headers: authHeader() })
		.then((res) => {
			setMonthlypledge(res.data);
			setLoading(false);
		})
		.catch((err) => {
			console.log(err);
			setError(err);
		});
	}, []);

	const handleSubmit = (payment_amount, active, user) => {
    axios.put(`http://localhost:8080/monthlypledges/${id}/edit`, {
				payment_amount: payment_amount,
				active: active,
				user: user,
    }, { headers: authHeader() })
    .then(res => {
      navigate(`/monthlypledges/${id}`)
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
				<h1>Edit Monthlypledge</h1>
				<ValidatedForm submit={(payment_amount, active, user) => handleSubmit(payment_amount, active, user)} model={monthlypledge}/>
			</div>
		)
	}
}
