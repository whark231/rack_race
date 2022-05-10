import { React, useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import authHeader from '../../services/auth-header';
import axios from 'axios';
import WorkoutPostComponent from './WorkoutPostComponent';

export default function WorkoutPost({ username, length, location, description, date, time }) { 
    // get ID form url
    const { workoutid } = useParams();
    // get all of the workouts right now
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [workout, setWorkout] = useState({});

    console.log(workoutid);
    // use axios to find the corresponding post in the DB
    useEffect(() => {
        axios.get(`http://localhost:8080/workout/getworkout/${workoutid}`, { headers: authHeader() })
        .then((res) => {
            if (res.status === 500) {
                setError(true);
            } else {
                console.log(res.data);
                setWorkout(res.data);
            }
            setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
      }, [loading]);

    // rende gu
    if(!loading){
        return (
            <WorkoutPostComponent username={workout.user.name} length={workout.workout_length} 
                location={workout.location} description={workout.description} date={workout.date} time={workout.time} /> 
        );
    } else {
        return (
            <h1>loading....</h1>
        );
    }
    
}