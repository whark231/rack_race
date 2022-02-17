import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import MuiAlert from '@mui/material/Alert';
import {
  Snackbar,
  TextField,
  Button,
  Checkbox,
  Stack
} from '@mui/material'

const Alert = React.forwardRef((props, ref) => {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ValidatedForm(props) {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [charity, setCharity] = useState('');
  const [err, setErr] = useState(null)
  const [openErr, setOpenErr] = useState(false)

  useEffect(() => {
		if (props.model) {
			setName(props.model.name);
			setUsername(props.model.username);
			setEmail(props.model.email);
			setCharity(props.model.charity);
		}
	}, [props.model]);

  const validate = () => {
		if (name !== '' && username !== '' && email !== '' && password !== '' && charity !== '') {
			props.submit(name, username, email, password, charity)
		} else {
			if (name === '') {
				setErr('name cannot be left blank')
			}
			else if (username === '') {
				setErr('username cannot be left blank')
			}
			else if (email === '') {
				setErr('email cannot be left blank')
			}
			else if (password === '') {
				setErr('password cannot be left blank')
			}
			else if (charity === '') {
				setErr('charity cannot be left blank')
			}
      setOpenErr(true)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenErr(false);
  };

  return (
    <div className='container'>
      <Stack spacing={3}>
				<TextField
					label='name' size='small' type='String'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<TextField
					label='username' size='small' type='String'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					label='email' size='small' type='String'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<TextField
					label='password' size='small' type='String'
          type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<TextField
					label='charity' size='small' type='String'
					value={charity}
					onChange={(e) => setCharity(e.target.value)}
				/>
        <Button variant="contained" onClick={validate}>Submit</Button>
      </Stack>

      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {err}
        </Alert>
      </Snackbar>
    </div>
  )
}