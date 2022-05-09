import React, { useState, useContext, useRef, useEffect } from 'react'
import { Button, TextField, Stack } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import configData from '../config.json'

export default function VerifyEmail() {
  const { id, token } = useParams();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    setError(null);
    setLoading(true);
    axios.get(`${configData.SERVER_URL}/users/${id}/verify/${token}`)
    .then((res) => {
      setLoading(false)
      setResponse(res.data.message);
    })
    .catch((err) => {
      setLoading(false);
      setError(err.response.data.message);
    });
  }

  useEffect(() => {
    handleForgotPassword()
  }, [])


  if (loading) {
    return (
      <div>Loading...</div>
    )
  }
  return (
    <div className='col'>
      <Stack spacing={3}>
        {error ?
          <div style={{color: "red"}}>{error}</div>
          :
          <h1 style={{color: "limegreen"}}>Your Email has been Verified!</h1>
        }
      </Stack>
    </div>
  )
}