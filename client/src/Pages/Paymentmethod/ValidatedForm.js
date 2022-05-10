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
  const { id } = useParams();
	const [number, setNumber] = useState(0);
	const [name, setName] = useState('');
	const [expiration_date, setExpiration_Date] = useState('');
	const [CVV, setCvv] = useState(0);
  const [err, setErr] = useState(null)
  const [user, setUser] = useState(id ? id : '');
  const [openErr, setOpenErr] = useState(false)

  useEffect(() => {
		if (props.model) {
			setNumber(props.model.number);
			setName(props.model.name);
			setExpiration_Date(props.model.expiration_date);
			setCvv(props.model.CVV);
      setUser(props.model.user);
		}
	}, [props.model]);

  const validate = () => {
		if (number !== '' && name !== '' && expiration_date !== '' && CVV !== '' && user !== '') {
			props.submit(number, name, expiration_date, CVV, user)
		} else {
			if (number === '') {
				setErr('number cannot be left blank')
			}
			else if (name === '') {
				setErr('name cannot be left blank')
			}
			else if (expiration_date === '') {
				setErr('expiration_date cannot be left blank')
			}
			else if (CVV === '') {
				setErr('CVV cannot be left blank')
			}
      else if (user === '') {
				setErr('user cannot be left blank')
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
					label='number' size='small' type='Number'
					value={number}
					onChange={(e) => setNumber(e.target.value)}
          id = "number"
				/>
				<TextField
					label='name' size='small' type='String'
					value={name}
					onChange={(e) => setName(e.target.value)}
          id = "name"
				/>
				<TextField
					label='expiration_date' size='small' type='String'
					value={expiration_date}
					onChange={(e) => setExpiration_Date(e.target.value)}
          id = "expiration_date"
				/>
				<TextField
					label='CVV' size='small' type='Number'
					value={CVV}
					onChange={(e) => setCvv(e.target.value)}
          id = "cvv"
				/>
        <TextField
					label='user' size='small' type='String'
					value={user}
					onChange={(e) => setUser(e.target.value)}
				/>
        <Button id = "submit" variant="contained" onClick={validate}>Submit</Button>
      </Stack>

      <Snackbar open={openErr} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {err}
        </Alert>
      </Snackbar>
    </div>
  )
}
