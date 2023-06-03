import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";

export default function ViewBook() {
  const [book, setBook] = useState({});
  const { bookId } = useParams();

  useEffect(() => {
    loadBook();
  }, []);

  const getStatus = (status) => {
    return status === 1  ? "Available" : "Not Available";
  };

  const loadBook = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/books/${bookId}`);
      console.log(response.data.data.book);
      setBook(response.data.data.book);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Card variant="outlined" sx={{ mt: 4, backgroundColor: "#f5f5f5" }}>
        <CardHeader fontFamily="monotype corsiva "
          title="Book Details"
          sx={{ textAlign: "center", backgroundColor: "#e0e0e0",fontFamily: "monotype corsiva "}}
        /> 
        <CardContent>
          <Typography variant="body1" component="div">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Id: 00{book.bookId}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Book Name: {book.bookName}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Genre: {book.genre}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Status: {getStatus(book.statusOfBook)}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Author: {book.author}
                </Typography>
              </li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
      <Button
        component={Link}
        to="/booklist"
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
      >
        Back to Home
      </Button>
    </Container>
  );
}
