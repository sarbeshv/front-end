import TextField from "@mui/material/TextField";
import "./SignUp.css";
import { Container } from "@mui/system";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState(null); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const callApi = async (data) => {
    try {
      const response = await axios.post("http://localhost:8080/Login", data);
      console.log(response);
      if (response.data.status === 200) {
        navigate("/home");
      }
      if (response.data.status === 403) {
        setLoginError("Access denied. Please check your credentials.");
      }
      
    } catch (error) {

      if (error.response && error.response.status === 403) {
        setLoginError("Access denied. Please check your credentials.");
      } else {
        setLoginError("Login not found. Please check your credentials.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send formData to the API
      const response = await callApi(formData);
      console.log(response);
      // Redirect to another page after successful login
      
    } catch (error) {
      // Handle login errors
      setLoginError("Login not found. Please check your credentials."); // Update the login error state
    }
  };
  const handleCloseSnackbar = () => {
    setLoginError(null);
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
  >
    Bookworm Library
  </Typography>
    <Container maxWidth="sm"sx={{
      backgroundColor:  'rgba(0, 0, 0, 0.1)', // Change the background color
      padding: '2rem',
      borderRadius: '0.5rem',}}>
        
      <Typography
        variant="h3"
        fontFamily="monotype corsiva "
        color="white"
        align="center"
        gutterBottom
      >
        LOGIN IN
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          name="email"
          className="custom-textfield"
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          className="custom-textfield"
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          className="custom-button"

          variant="contained"
          color="info"
          fullWidth
          size="large"
        >
          Sign Up
        </Button>
        <div className="register">
          <h6 color="white">New to website register here...</h6>
          <Button
            variant="outlined"
            className="custom-button"
            sx={{ ml: 1 }}
            to="/register"
            color="error"
            size="large"
            component={Link}
          >
            Register
          </Button>
        </div>
      </form>
    </Container>
    <Snackbar
        open={loginError !== null}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {loginError}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;
