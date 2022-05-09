import React, { useState, useContext, useRef } from 'react'
import { Button, TextField, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [needsReset,setNeedsReset] = useState(false);
  const answer = useRef("");
  const navigate = useNavigate();
  

  const { login, error } = useAuth();


  //NOT FINISHED WITH RESET PASWORD 

  function verify(username, answer){
    setNeedsReset(false);
    navigate("/users");
    return true;
  }



  if(needsReset){

    return (
      <div className='col'>
        <h1>Reset Password</h1>
        <Stack spacing={3}>
          {error &&
            <div style={{color: "red"}}>{error}</div>
          }
          <TextField
              label="username"
              onChange={(e)=>setUsername(e.target.value)}
              size="small"
            />
          <TextField
            label="Enter maiden name of mother"
            onChange={(e)=> answer.current = e.target.value}
            type={"password"}
            size="small"
          />
          <TextField
          label="New password"
          onChange={(e)=>setPassword(e.target.value)}
          type={"password"}
          size="small"
        />
          {/* Submit */}
          <Button 
            variant="contained" 
            onClick={() => verify(username, answer.current)}
          >Verify</Button>
        </Stack>
      </div>
    )

  }

  return (
    <div className='col'>
      <h1>Login</h1>
      <Stack spacing={3}>
        {error &&
          <div style={{color: "red"}}>{error}</div>
        }
        <TextField
            label="username"
            onChange={(e)=>setUsername(e.target.value)}
            size="small"
          />
        <TextField
          label="password"
          onChange={(e)=>setPassword(e.target.value)}
          type={"password"}
          size="small"
        />
        {/* Submit */}
        <Button 
          variant="contained" 
          onClick={() => login(username, password)}
        >Login</Button>
        <Button 
          variant="contained" 
          onClick={() => setNeedsReset(true)}
        >Reset Password</Button>

      </Stack>
    </div>
  )





}