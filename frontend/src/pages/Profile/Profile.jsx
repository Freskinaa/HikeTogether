import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/authSlice';
import {  useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Profile 