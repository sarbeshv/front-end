import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ToggleNavBar = ({ children }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in based on your authentication logic
    // You can update the condition below as per your requirements
    const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/register' || location.pathname === '/logout') {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [location]);

  return <div>{isLoggedIn && children}</div>;
};

export default ToggleNavBar;
