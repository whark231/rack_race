import { React, useState, useRef } from 'react';
import {
    Stack,
    Card
  } from '@mui/material'

export default function WorkoutPostComponent({ username, length, location, description, date, time }) { 
    
    return (
        <Card sx={{ maxWidth: 345 }}> 
          <h1> {username + "'s Workout from " + date}</h1> 
          <h2> {"Description: " + description}</h2> 
          <h2> {"Location: " + location}</h2> 
          <h2> {"Length of workout (min): " + length}</h2> 
          <h2> {"Time: " + time}</h2> 
        </Card>
    );
}