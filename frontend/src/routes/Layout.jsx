import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Navbar from './../components/navbar/Navbar';
import Footer from './../components/footer/Footer';
import ScrollToTop from '../utils/ScrollToTop';
import { useSelector } from "react-redux";

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  const isLoginSignUp = pathname === '/login' || pathname === '/signup';
  const accessToken = useSelector((state) => state.auth.accesstoken);

  const navShouldBeHidden =  isLoginSignUp;
  if (accessToken && isLoginSignUp) {
    return <Navigate to='/' replace />;
  }

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
