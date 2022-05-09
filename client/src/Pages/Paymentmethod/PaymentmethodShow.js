import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress, TextField } from '@mui/material';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

export default function PaymentmethodShow(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paymentmethod, setPaymentmethod] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`${configData.SERVER_URL}/paymentmethods/${id}`, { headers: authHeader() })
    .then((res) => {
      if (res.status === 500) {
        setError(true);
      } else {
        setPaymentmethod(res.data);
      }
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError(err);
    });
  }, []);

  function handleDelete() {
    axios.delete(`http://localhost:8080/paymentmethods/${id}`, { headers: authHeader() });
    navigate(`/users/${paymentmethod.user}`);
  }


  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div className='container'>
        <div className='row'>
          <h1 className='paddedRight'>Payment Method {id}</h1>

          <Button variant="outlined" style={{marginRight: 15}}
            onClick={() => navigate(`/paymentmethods/${id}/edit`)}>edit
          </Button>
          <Button variant="contained" color="error" 
            onClick={handleDelete}>delete
          </Button>
        </div>

				<label>Number: {paymentmethod.number}</label>
				<label>Name: {paymentmethod.name}</label>
				<label>Expiration_Date: {paymentmethod.expiration_date}</label>
				<label>Cvv: {paymentmethod.CVV}</label>

      </div>
    );
  }
}
