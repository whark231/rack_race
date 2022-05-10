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
	const [target_days, setTarget_Days] = useState(0);
	const [curr_days_met, setCurr_Days_Met] = useState(0);
	const [weekly_plan, setWeekly_Plan] = useState('');
	const [monthlypledge, setMonthlypledge] = useState(id ? id : '');
  const [err, setErr] = useState(null)
  const [openErr, setOpenErr] = useState(false)

  useEffect(() => {
		if (props.model) {
			setTarget_Days(props.model.target_days);
			setCurr_Days_Met(props.model.curr_days_met);
			setWeekly_Plan(props.model.weekly_plan);
			setMonthlypledge(props.model.monthlypledge);
		}
	}, [props.model]);

  const validate = () => {
		if (target_days !== '' && curr_days_met !== '' && weekly_plan !== '' && monthlypledge !== '') {
			props.submit(target_days, curr_days_met, weekly_plan, monthlypledge)
		} else {
			if (target_days === '') {
				setErr('target_days cannot be left blank')
			}
			else if (curr_days_met === '') {
				setErr('curr_days_met cannot be left blank')
			}
			else if (weekly_plan === '') {
				setErr('weekly_plan cannot be left blank')
			}
			else if (monthlypledge === '') {
				setErr('monthlypledge cannot be left blank')
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
					label='target_days' size='small' type='Number'
					value={target_days}
					onChange={(e) => setTarget_Days(e.target.value)}
          id = "target_days"
				/>
				<TextField
					label='curr_days_met' size='small' type='Number'
					value={curr_days_met}
					onChange={(e) => setCurr_Days_Met(e.target.value)}
          id = "curr_days_met"
				/>
				<TextField
					label='weekly_plan' size='small' type='String'
					value={weekly_plan}
					onChange={(e) => setWeekly_Plan(e.target.value)}
          id = "weekly_plan"
				/>
				<TextField
					label='monthlypledge' size='small' type='String'
					value={monthlypledge}
					onChange={(e) => setMonthlypledge(e.target.value)}
          id = "monthlypledge"
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
