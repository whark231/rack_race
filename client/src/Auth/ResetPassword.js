import React, { useState, useContext, useRef } from 'react'
import { Button, TextField, Stack } from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth'
import configData from '../config.json'

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const { token } = useParams();
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = () => {
    setError(null);
    setLoading(true);
    axios.put(`${configData.SERVER_URL}/resetpassword`, {
      resetLink: token,
      newPassword: newPassword
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
      <h1>Reset Password</h1>
      <Stack spacing={3}>
        {error &&
          <div style={{color: "red"}}>{error}</div>
        }
        {response &&
          <div style={{color: "blue"}}>{response}</div>
        }
        <TextField
          label="new password"
          value={newPassword}
          type="password"
          onChange={(e)=>setNewPassword(e.target.value)}
          size="small"
        />

        {/* Submit */}
        <Button 
          variant="contained" 
          onClick={handleResetPassword}
        >{loading ? "Loading..." : "Reset Password"}</Button>
      </Stack>
    </div>
  )
}