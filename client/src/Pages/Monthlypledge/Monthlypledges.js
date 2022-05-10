import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'
import useApi from '../../hooks/useApi';

export default function Monthlypledges() {
  const [monthlypledges, setMonthlypledges] = useState([]);
  const { result: monthlyPledges, loading, error, refresh } = useApi(`${configData.SERVER_URL}/monthlypledges`);
  const navigate = useNavigate();

  // useEffect(() => {
  //   axios.get(`${configData.SERVER_URL}/monthlypledges`, { headers: authHeader() })
  //     .then((res) => {
  //       setMonthlypledges(res.data)
  //     });
  // }, []);

  function handleDelete(id) {
    axios.delete(`${configData.SERVER_URL}/monthlypledges/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  return (
    <div className='container'>
      <h1>Monthlypledges</h1>
      <Button id = "new" variant={"contained"} onClick={() => navigate("/monthlypledges/new")}>new monthly pledge</Button>

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
