import React, { useState, useContext, useRef } from 'react'
import { Button, TextField, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import useAuth from '../hooks/useAuth'
import configData from '../config.json'

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    setLoading(true);
    setError(null);
    axios.put(`${configData.SERVER_URL}/forgotpassword`, {
      email
    })
    .then((res) => {
      setLoading(false);
      setResponse(res.data.message);
    })
    .catch((err) => {
      setLoading(false);
      setError(err.response.data.message);
    });
  }

  return (
    <div className='col'>
      <h1>Forgot Password</h1>
      <Stack spacing={3}>
        {error &&
          <div style={{color: "red"}}>{error}</div>
        }
        {response &&
          <div style={{color: "blue"}}>{response}</div>
        }
        <TextField
          label="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          size="small"
        />

        {/* Submit */}
        <Button 
          variant="contained" 
          onClick={handleForgotPassword}
        > {loading ? "Loading..." : "Forgot Password"}</Button>
      </Stack>
    </div>
  )
}