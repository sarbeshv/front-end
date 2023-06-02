import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import axios from 'axios';
import "./SignUp.css";
import { Link, useNavigate } from 'react-router-dom';


export default function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();



  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userName: userName,
        email: email,
        password: password,
      };

      const response = await axios.post('http://localhost:8080/Register', payload);
      console.log(response.data.data); // Handle the response as needed

      // Reset form fields
      setUserName('');
      setEmail('');
      setPassword('');
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
    <Typography
    variant="h2"
    fontFamily="monotype corsiva "
    font="bold"
    color="white"
    align="center"
    gutterBottom
  >Bookworm Library</Typography>
    <Container sx={{
      backgroundColor:  'rgba(0, 0, 0, 0.1)', // Change the background color
      padding: '2rem',
      borderRadius: '0.5rem',}} maxWidth="sm">
      <Typography variant="h3" align="center" fontFamily="monotype corsiva " color="white" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          className="custom-textfield"
          value={userName}
          onChange={handleUserNameChange}
          required
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          className="custom-textfield"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          className="custom-textfield"
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <Button variant="contained"className="custom-button" color="primary" fullWidth type="submit">
          Register
        </Button>
        <div className="register">
          <h6 color="white">If you are already a member...</h6>
          <Button
            variant="outlined"
            className="custom-button"
            sx={{ ml: 2 }}
            to="/login"
            color="error"
            size="large"
            component={Link}
          >
            Login 
          </Button>
        </div>
      </form>
    </Container>
    </div>
  );
}
