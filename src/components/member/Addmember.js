import { Button, Container, Snackbar, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

export default function AddMember() {
  const [memberData, setMemberData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onInputChange = (e) => {
    setMemberData({ ...memberData, [e.target.name]: e.target.value });
  };

  const sendFormData = async (data) => {
    try {
      const response = await axios.post('http://localhost:8080/member/add', data);
      console.log(response.data); // Handle the response as needed
      setOpenSnackbar(true); // Open the snackbar
      setErrorMessage(''); // Clear any previous error message
      setMemberData({}); // Reset the memberData state to an empty object
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setErrorMessage('Member already exists.'); // Set the error message for duplicate member
      } else {
        setErrorMessage('An error occurred. Please try again.'); // Set a generic error message
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send formData to the API
    sendFormData(memberData);
    console.log("memberData", memberData);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Change the background color
        padding: '2rem',
        borderRadius: '0.5rem',
      }}
      maxWidth="sm"
    >
      <Typography variant="h4" align="center" color="white" gutterBottom>
        ADD MEMBER
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className="custom-textfield"
          label="Username"
          name="userName"
          fullWidth
          margin="normal"
          onChange={onInputChange}
          required
          value={memberData.userName || ''}
        />
        <TextField
          className="custom-textfield"
          label="Gender"
          name="gender"
          fullWidth
          margin="normal"
          onChange={onInputChange}
          required
          value={memberData.gender || ''}
        />
        <TextField
          className="custom-textfield"
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          onChange={onInputChange}
          required
          value={memberData.email || ''}
        />
        <TextField
          className="custom-textfield"
          label="Phone Number"
          name="phoneNumber"
          fullWidth
          margin="normal"
          onChange={onInputChange}
          required
          value={memberData.phoneNumber || ''}
        />
        <Button
          variant="contained"
          className='mt-4 custom-button'
          size="large"
          fullWidth
          type="submit"
        >
          ADD
        </Button>
        <Link to="/">
          <Button
            className="mt-4 custom-button"
            variant="contained"
            margin="normal"
            size="large"
            fullWidth
            type="submit"
          >
            cancel
          </Button>
        </Link>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Member added!"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
      {errorMessage && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setErrorMessage('')}
          message={errorMessage}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        />
      )}
    </Container>
  );
}
