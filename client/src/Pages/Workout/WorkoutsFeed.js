import { React, useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import authHeader from '../../services/auth-header';
import axios from 'axios';
import WorkoutPostComponent from './WorkoutPostComponent';

export default function WorkoutsFeed({ username, length, location, description, date, time }) { 
    // get all of the workouts right now
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [workouts, setWorkouts] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/workout/getfeedworkouts`, { headers: authHeader() })
        .then((res) => {
            if (res.status === 500) {
                setError(true);
            } else {
                
                setWorkouts(res.data);
            }
            console.log("here");
            setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setError(err);
        });
      }, [loading]);

      const workout_li = [];

      workouts.forEach((workout) => {
          // console.log(workout);
          
          workout_li.push(<li><a href={"/workout/" + workout._id}>{workout.date + ' ' + workout.description} </a> </li>);
      });        
    
    return (
        <div>
            <h1>Workout feed</h1>
            <ul> {workout_li} </ul>
        </div>
    );
}