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
	const [workoutLength, setWorkoutLength] = useState(0);
	const [location, setWorkoutLocation] = useState('');
	const [description, setWorkoutDescription] = useState('');
	const [date, setWorkoutDate] = useState('');
	const [time, setWorkoutTime] = useState('');
	const [err, setErr] = useState(null)
	const [openErr, setOpenErr] = useState(false)

  useEffect(() => {
		if (props.model) {
			setWorkoutLength(props.model.workoutLength);
			setWorkoutLocation(props.model.location);
			setWorkoutDescription(props.model.description);
			setWorkoutDate(props.model.date);
			setWorkoutTime(props.model.time);
		}
	}, [props.model]);

  const validate = () => {
		if (workoutLength > 0 && location !== '' && description !== '' && date !== '' && time !== '') {
			props.submit(workoutLength, location, description, date, time)
		} else {
			if (workoutLength === '') {
				setErr('workoutLength cannot be left blank')
			}
			else if (location === '') {
				setErr('location cannot be left blank')
			}
			else if (description === '') {
				setErr('description cannot be left blank')
			} 
			else if (date === '') {
				setErr('date cannot be left blank')
			}
			else if (time === '') {
				setErr('time cannot be left blank')
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
					label='Workout length (minutes)' size='small' type='Number'
					value={workoutLength}
					onChange={(e) => setWorkoutLength(e.target.value)}
				/>
				<TextField
					label='Workout location' size='large' type='String'
					value={location}
					onChange={(e) => setWorkoutLocation(e.target.value)}
				/>
				<TextField
					label='Description' size='small' type='String'
					value={description}
					onChange={(e) => setWorkoutDescription(e.target.value)}
					multiline
					minRows={4}
					helperText="What did you do during your workout"
				/>
				<TextField
					label='Workout date' size='small' type='String'
					value={date}
					onChange={(e) => setWorkoutDate(e.target.value)}
					helperText="MM/DD/YYYY"
				/>
				<TextField
					label='Workout time' size='small' type='String'
					value={time}
					onChange={(e) => setWorkoutTime(e.target.value)}
					helperText=""
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