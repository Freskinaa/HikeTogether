import React, { useState } from 'react';
import './navProfile.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faCalendarDays, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from "react-redux";
import { logout } from '../../store/authSlice';

const NavProfile = ({ section }) => {
  const dispatch = useDispatch();
  const [activeSection, setActiveSection] = useState('Profile');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout())
  };

  const handleSection = (selectedSection) => {
    section(selectedSection);
    setActiveSection(selectedSection);
    handleMenuOpen();
  };

  const handleMenuOpen = () => {
    if (window.innerWidth < 1024) {
      setIsMenuOpen(!isMenuOpen);
      const navbar = document.querySelector('.profile-links');
      navbar.classList.toggle('open', isMenuOpen);
    }
  };

  return (
    <div className='profile-navbar'>
      <ul className={`profile-links ${isMenuOpen ? 'open': ''}`}>
        <li className={`profile-link ${activeSection === 'Profile' ? 'active' : ''}`} onClick={() => { handleSection('Profile') }}>
          <FontAwesomeIcon icon={faUser}/>
          <span>
            Profile
          </span>
        </li>
    
        <li className={`profile-link ${activeSection === 'Joined Events' ? 'active' : ''}`} onClick={() => { handleSection('Joined Events') }}>
          <FontAwesomeIcon icon={faCalendarDays}/>
          <span>
            Joined events
          </span>
        </li>
        <li className='profile-link' onClick={() => handleLogout()}>
          <FontAwesomeIcon icon={faArrowRightFromBracket}/>
          <span>
            Logout
          </span>
        </li>
      </ul>
      <div className={`profile-burger-menu ${isMenuOpen ? 'rotate' : ''}`} onClick={() => handleMenuOpen()}>
        <FontAwesomeIcon icon={faPlus}/>
      </div>
    </div>
  )
}

export default NavProfile;
