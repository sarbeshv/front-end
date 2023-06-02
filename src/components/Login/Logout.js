import React from 'react';
import { Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import "./SignUp.css";

const LogoutPage = () => {
  const handleLogout = () => {
    // Implement your logout logic here
    // Redirect the user to the login page or perform any other necessary actions
    console.log('Logout successful');
  };

  return (
    <div>
    <Typography
        variant="h2"
        fontFamily="monotype corsiva "
        color="white"
        align="center"
        gutterBottom
      >
        Bookworm Library
      </Typography>
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h4" component="h2"  color="white" gutterBottom>
        Logout
      </Typography>
      <Typography variant="body1"  color="white" gutterBottom>
        You have been logged out successfully.
      </Typography>
      <Link to="/">
      <Button variant="contained"  className="custom-button" onClick={handleLogout} size="large" sx={{ marginTop: '20px' }}>
        Log In Again
      </Button>

      </Link>
     
    </Container>
    </div>
  );
};

export default LogoutPage;
