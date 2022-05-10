import { React, useState, useRef } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import WorkoutPostComponent from './WorkoutPostComponent';

export default function WorkoutPost({ username, length, location, description, date, time }) { 
    // get ID form url
    const { workoutid } = useParams();
    console.log(workoutid);
    // use axios to find the corresponding post in the DB

    // rende gu
    return (
        <WorkoutPostComponent/> 
    );
}