import React from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';
import Navbar from './../components/navbar/Navbar';
import Footer from './../components/footer/Footer';
import ScrollToTop from '../utils/ScrollToTop';

const Layout = () => {
  const location = useLocation();
  const { pathname } = location;
  const loggedUser = false; // or false
  const isLoginSignUp = pathname === '/login' || pathname === '/sign-up';

  const basePath = '/user-stats';
  const hideNav = pathname.startsWith(basePath);
  const navShouldBeHidden = hideNav || isLoginSignUp;
  if (loggedUser && isLoginSignUp) {
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
