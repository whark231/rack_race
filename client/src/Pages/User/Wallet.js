import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, CircularProgress, TextField } from '@mui/material';
import { UserContext } from '../../hooks/UserContext';
import authHeader from '../../services/auth-header';
import '../../App.css';
import configData from '../../config.json'

export default function Wallet(props) {
  const { id } = useParams();
  const { authUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true)
    axios.get(`${configData.SERVER_URL}/users/${authUser._id}`, { headers: authHeader() })
    .then((res) => {
      setUser(res.data);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError(err);
      setLoading(false);
    });
  }, [id]);

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/paymentmethods/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (loading) {
    return <CircularProgress />;
  } else {
    return (
      <div className='container'>

        <h1>Wallet</h1>

        {/* PAYMENT INFO */}
        <div className='displayContainer'>
          <h3>Payment Methods</h3>
          <Button id = "new_pay" variant='contained' onClick={() => navigate(`/users/${authUser._id}/paymentmethods/new`)}>New Payment Method</Button>
          <ul>
          {user && user.paymentmethods && user.paymentmethods.map((method, i) => (
            <div className='listItem' key={i}>
              <li>{method.number}</li>
              <ButtonGroup variant="outlined" size="small">
                <Button onClick={() => navigate(`/paymentmethods/${method._id}`)}>show</Button>
                <Button onClick={() => navigate(`/paymentmethods/${method._id}/edit`)}>edit</Button>
                <Button color="error" onClick={() => handleDelete(method._id)}>delete</Button>
              </ButtonGroup>
            </div>
          ))}
          </ul>
        </div>
      </div>
    );
  }
}
