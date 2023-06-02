import {
  Button,
  Container,
  Snackbar,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function AddBook() {
  const [bookData, setBookData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedGenre, setSelectedGenre] = useState('');

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
    setBookData({ ...bookData, genre: event.target.value });
  };

  const onInputChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const sendFormData = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/books/add",
        data
      );
      console.log(response.data);
      setErrorMessage("Book Updated!");
      setBookData({});
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("Duplicate book found.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  const handleSubmit =  async (e) => {
    e.preventDefault();
  
    if (bookData.bookName.length < 4)  {
      setErrorMessage("Book name should be at least 4 characters long.");
      setOpenSnackbar(true); // Open the snack bar

    }
    else if(bookData.author.length < 4) {
      setErrorMessage("Author should be at least 4 characters long.");
      setOpenSnackbar(true);
    }
      else {
      try {
        // Send formData to the API
        const response = await sendFormData(bookData);
        console.log("bookdata", bookData);
        setErrorMessage("Book Updated!");
        setOpenSnackbar(true); // Open the success snack bar
        setBookData({});
      } catch (error) {
        console.error(error);
        if (error.response && error.response.status === 409) {
          setErrorMessage("Duplicate book found.");
        } else {
          setErrorMessage("An error occurred. Please try again.");
        }
        setOpenSnackbar(true); // Open the error snack bar
      }
    }       
  };
  

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container
      sx={{
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        padding: "2rem",
        borderRadius: "0.5rem",
      }}
      maxWidth="sm"
    >
      <Typography variant="h4" fontFamily="monotype corsiva " align="center" color="white" gutterBottom>
        ADD BOOK
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          className="custom-textfield"
          label="bookName"
          name="bookName"
          fullWidth
          margin="normal"
          onChange={onInputChange}
          required
          value={bookData.bookName || ""}
        />
      <FormControl fullWidth margin="normal" required>
  <InputLabel id="genre-label" style={{ color: 'white' }}>Genre</InputLabel>
  <Select
    labelId="genre-label"
    id="genre-select"
    value={selectedGenre}
    onChange={handleGenreChange}
    className="custom-select"
    input={
      <OutlinedInput
        label="Genre"
        notched
        classes={{
          notchedOutline: 'custom-notched-outline',
        }}
        style={{ borderColor: 'white', color: 'white' }}
      />
    }
  >
    <MenuItem value="fiction">Fiction</MenuItem>
    <MenuItem value="nonfiction">Nonfiction</MenuItem>
    <MenuItem value="mystery">Mystery</MenuItem>
  </Select>
</FormControl>
        <TextField
          className="custom-textfield"
          label="author"
          name="author"
          fullWidth
          margin="normal"
          onChange={onInputChange}
          required
          value={bookData.author || ""}
        />
        <Button
          variant="contained"
          className="mt-4 custom-button"
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
        message="Book submitted!"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
      {errorMessage && (
        <Snackbar
          open={true}
          autoHideDuration={3000}
          onClose={() => setErrorMessage("")}
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
