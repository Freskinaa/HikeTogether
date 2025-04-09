import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Navbar from './../components/navbar/Navbar';
import Footer from './../components/footer/Footer';
import ScrollToTop from '../utils/ScrollToTop';
import { useSelector } from "react-redux";
// This code defines a Layout component that wraps the main content of the application. It handles 
// the rendering of the navigation bar and footer based on the current route and whether the user 
// is logged in. It also includes functionality to scroll to the top of the page and redirect the 
// user if they're already logged in on the login or signup page.

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  const isLoginSignUp = pathname === '/login' || pathname === '/signup';
  const accessToken = useSelector((state) => state.auth.accesstoken);

  const navShouldBeHidden =  isLoginSignUp;
  if (accessToken && isLoginSignUp) {
    return <Navigate to='/' replace />;
  }

  // Check if the user is logged in and trying to access login or signup page
  return (
    <div className='app'>
        {!navShouldBeHidden && <Navbar />}
        <ScrollToTop />
        <Outlet />
        {!navShouldBeHidden && <Footer />}
    </div>
  );
};

export default Layout;
