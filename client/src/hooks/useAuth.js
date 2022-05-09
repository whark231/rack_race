import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from './UserContext';
import configData from "../config.json";

export default function useAuth() {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(UserContext);
  const [error, setError] = useState(null);

  const setUserContext = () => {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      setAuthUser(auth.user);
      navigate('../');
    }
  }

  // login
  const login = (username, password) => {
    setError(null);
    axios.post(`${configData.SERVER_URL}/login`, {
      username: username,
      password: password
    })
    .then((res) => {
      if (res.data.token) {
        localStorage.setItem("auth", JSON.stringify(res.data));
        setUserContext();
      }
      return res.data;
    })
    .catch((err) => {
      setError(err.response.data.message);
    });
  }

  // logout
  const logout = () => {
    localStorage.removeItem('auth');
    setAuthUser(null);
    navigate('/');
  }

  // register user
  const registerUser = async (data) => {
    const { name, address, username, email, password } = data;
    return axios.post(`${configData.SERVER_URL}/register`, {
      name, address, username, email, password
    })
    .then(res => {
      setUserContext();
    })
    .catch(err => {
      setError(err.response.data.message);
    })
  };

  return {
    login,
    logout,
    registerUser,
    error
  }
}