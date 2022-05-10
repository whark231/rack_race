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
	const [payment_amount, setPayment_Amount] = useState(0);
	const [active, setActive] = useState(false);
	const [user, setUser] = useState(id ? id : '');
  const [err, setErr] = useState(null)
  const [openErr, setOpenErr] = useState(false)

  useEffect(() => {
		if (props.model) {
			setPayment_Amount(props.model.payment_amount);
			setActive(props.model.active);
			setUser(props.model.user);
		}
	}, [props.model]);

  const validate = () => {
		if (payment_amount !== '' && active !== '' && user !== '') {
			props.submit(payment_amount, active, user)
		} else {
			if (payment_amount === '') {
				setErr('payment_amount cannot be left blank')
			}
			else if (active === '') {
				setErr('active cannot be left blank')
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
					label='payment_amount' size='small' type='Number'
					value={payment_amount}
					onChange={(e) => setPayment_Amount(e.target.value)}
				/>
				<div className='row'>
					<label>active:</label>
					<Checkbox
						checked={active}
						defaultChecked
						onChange={(e) => setActive(e.target.type === 'checkbox' ? e.target.checked : e.target.value)}
					/>
				</div>
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
