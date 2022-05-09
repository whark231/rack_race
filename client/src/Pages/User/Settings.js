import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import authHeader from '../../services/auth-header';
import '../../App.css';
import { UserContext } from '../../hooks/UserContext';
import useAuth from '../../hooks/useAuth';
import configData from '../../config.json'

export default function Settings() {
  const { authUser } = useContext(UserContext);
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleDelete() {
    axios.delete(`${configData.SERVER_URL}/users/${authUser._id}`, { headers: authHeader() });
    logout();
  }

	return (
    <div className='container'>
      <h1>Settings</h1>
      <div className='row'>

        {/* EDIT USER INFO */}
        <div 
          className='settingsContainer'
          onClick={() => navigate(`/users/${authUser._id}/edit`)}
        >
          <h4>Edit User Info</h4>
          <p>Edit your account information</p>
        </div>

        {/* PAYMENT METHODS */}
        <div 
          className='settingsContainer'
          onClick={() => navigate('wallet')}
        >
          <h4>Edit Payment Info</h4>
          <p>Edit your payment information</p>
        </div>

        {/* DELETE ACCOUNT */}
        <div 
          className='settingsContainer'
          onClick={handleDelete}
        >
          <h4>Delete account</h4>
          <p>Delete Account along with all information</p>
        </div>
      </div>
    </div>
  )
}
