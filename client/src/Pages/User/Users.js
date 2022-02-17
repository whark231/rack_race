import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, ButtonGroup } from '@mui/material';
import authHeader from '../../services/auth-header';
import '../../App.css';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  let query = useQuery();

  useEffect(() => {
    setError(null);
    axios.post("http://localhost:8080/search", 
      {
        query: query.get("search")
      }, { headers: authHeader() })
      .then((res) => {
        setUsers(res.data)
      })
      .catch((err) => {
        setUsers([])
        setError(err.response.data.message)
      })
  }, [query]);

  function handleDelete(id) {
    axios.delete(`http://localhost:8080/users/${id}`, { headers: authHeader() })
    window.location.reload();
  }

  return (
    <div className='container'>
      <h1>Users</h1>

      {error && 
        <div>{error}</div>
      }

      <ul>
      {users.map((user, i) => (
        <div className="listItem" key={i}>
					<li key={i}>{user.name}</li>
          <ButtonGroup variant="outlined" size="small">
            <Button onClick={() => navigate(`/users/${user._id}`)}>show</Button>
            <Button onClick={() => navigate(`/users/${user._id}/edit`)}>edit</Button>
            <Button color="error" onClick={() => handleDelete(user._id)}>delete</Button>
          </ButtonGroup>
        </div>
      ))}
      </ul>
    </div>
  )
}
