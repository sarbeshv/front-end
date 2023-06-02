import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import EditBookForm from "../Book/EditBook";
import { Typography } from "@mui/material";
import { Edit, Delete, Visibility } from "@mui/icons-material";


export default function Home() {
  const [books, setBooks] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books");
      console.log(response.data.data.books);
      setBooks(response.data.data.books);
    } catch (error) {
      // Handle errors
    }
  };
  const getStatus = (status) => {
    return status === 1  ? "Available" : "Not Available";
  };
  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/books/delete/${id}`);
    loadBooks();
  };

  return (
    <Container >
      <Typography variant="h4" component="h2"  align="center" fontFamily="monotype corsiva " style={{ color: 'white' }} gutterBottom>
        BOOK  LIST
      </Typography>
      <table className="table table-striped">
        <thead>
          <tr style={{ color: 'white' }} align="center">
            <th scope="col">#</th>
            <th scope="col">Book Name</th>
            <th scope="col">Book Id</th>
            <th scope="col">Genre</th>
            <th scope="col">Status</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody align="center">
          {books.map((book, index) => (
            <tr key={book.bookId}>
              <th style={{ color: 'white' }}scope="row">{index + 1}</th>
              <td style={{ color: 'white' }}>{book.bookName}</td>
              <td style={{ color: 'white' }}>{book.bookId}</td>
              <td style={{ color: 'white' }}>{book.genre}</td>
              <td style={{ color: 'white' }}>{getStatus(book.statusOfBook)}</td>
              <td>
              <Link to={`/viewbook/${book.bookId}`}>
                  <Visibility color="primary"  style={{ marginRight: "8px" }}/>
                </Link>

                <Link to={`/editbook/${book.bookId}`}>
                  <Edit color="primary"  style={{ marginRight: "8px" }} />
                </Link>

                <Delete
                  color="error"
                  onClick={() => deleteUser(book.bookId)}
                  style={{ marginRight: "8px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
