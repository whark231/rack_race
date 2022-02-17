import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function Paymentmethods() {
  const [paymentmethods, setPaymentmethods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/paymentmethods").then((res) => {
      setPaymentmethods(res.data)
    }, { headers: authHeader() });
  }, []);

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/paymentmethods/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  return (
    <div className='container'>
      <h1>Paymentmethods</h1>
      <Button variant={"contained"} onClick={() => navigate("/paymentmethods/new")}>new paymentmethod</Button>

      <ul>
      {paymentmethods.map((paymentmethod, i) => (
        <div className="listItem" key={i}>
					<li key={i}>{paymentmethod.number}</li>
          <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => navigate(`/paymentmethods/${paymentmethod._id}`)}>show</Button>
            <Button onClick={() => navigate(`/paymentmethods/${paymentmethod._id}/edit`)}>edit</Button>
            <Button color="error" onClick={() => handleDelete(paymentmethod._id)}>delete</Button>
          </ButtonGroup>
        </div>
      ))}
      </ul>
    </div>
  )
}
