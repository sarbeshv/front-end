import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./AddBook.css";

export default function EditBookForm() {
    const [bookData, setBookData] = useState({});
    const { bookId } = useParams();
  
    const onInputChange = (e) => {
      setBookData({ ...bookData, [e.target.name]: e.target.value });
    };
  
    useEffect(() => {
      loadBook();
    }, []);
  
    const loadBook = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/books/${bookId}`);
        console.log(response.data.data.book);
        setBookData(response.data.data.book);
      } catch (error) {
        console.error(error);
      }
    };
  
    const sendFormData = async (data) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/books/update/${bookId}`,
          data
        );
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      sendFormData(bookData);
      console.log("bookdata", bookData);
    };
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" fontFamily="monotype corsiva "  color ="white" align="center" gutterBottom>
          Edit Book
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ boxShadow: 2 }}
            label="bookName"
            className="custom-textfield"
            name="bookName"
            fullWidth
            margin="normal"
            onChange={onInputChange}
            required
            value={bookData.bookName || ""}
          />
          <TextField
            sx={{ boxShadow: 2 }}
            className="custom-textfield"
            label="genre"
            name="genre"
            fullWidth
            margin="normal"
            onChange={onInputChange}
            required
            value={bookData.genre || ""}
          />
          <TextField
            sx={{ boxShadow: 2 }}
            label="author"
            className="custom-textfield"
            name="author"
            fullWidth
            margin="normal"
            onChange={onInputChange}
            required
            value={bookData.author || ""}
          />
          <Button
            sx={{ boxShadow: 2 }}
            variant="contained"
            className="mt-4 custom-button"
            color="primary"
            size="large"
            fullWidth
            type="submit"
          >
            Save
          </Button>
          <Link to="/booklist">
            <Button
              sx={{ bgcolor: "#f06292" }}
              variant="contained"
              margin="normal"
              className="mt-4 custom-button"
              size="large"
              fullWidth
              type="button"
            >
              Cancel
            </Button>
          </Link>
        </form>
      </Container>
    );
  }
  