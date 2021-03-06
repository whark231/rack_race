import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import authHeader from '../../services/auth-header';
import '../../App.css';

export default function Monthlypledges() {
  const [monthlypledges, setMonthlypledges] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/monthlypledges", { headers: authHeader() })
      .then((res) => {
        setMonthlypledges(res.data)
      });
  }, []);

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/monthlypledges/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  return (
    <div className='container'>
      <h1>Monthlypledges</h1>
      <Button variant={"contained"} onClick={() => navigate("/monthlypledges/new")}>new monthlypledge</Button>

      <ul>
      {monthlypledges.map((monthlypledge, i) => (
        <div className="listItem" key={i}>
					<li key={i}>{monthlypledge.payment_amount}</li>
          <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => navigate(`/monthlypledges/${monthlypledge._id}`)}>show</Button>
            <Button onClick={() => navigate(`/monthlypledges/${monthlypledge._id}/edit`)}>edit</Button>
            <Button color="error" onClick={() => handleDelete(monthlypledge._id)}>delete</Button>
          </ButtonGroup>
        </div>
      ))}
      </ul>
    </div>
  )
}
