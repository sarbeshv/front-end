import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, TextField, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function ViewIssue(props) {
  const [issuedBooks, setIssuedBooks] = useState([]);
  const { issueId } = useParams();
  const [selectedBooks, setSelectedBooks] = useState([]);

  useEffect(() => {
    loadIssuedBooks();
  }, []);

  const loadIssuedBooks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/rest/issue/find/${issueId}`
      );
      setIssuedBooks(response.data);
      console.log(response.data);
    } catch (error) {
      // Handle errors
    }
  };

  const getStatus = (status) => {
    return status === 0 || status === 2 ? "Not Return" : "Book Return";
  };

  const handleBookSelection = (bookId) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  const handleReturnSelected = async () => {
    try {
      console.log(selectedBooks);
      const response = await axios.post(
        `http://localhost:8080/rest/issue/${issueId}/return`,
        { ids: selectedBooks }
       
      );
      console.log(response.data);
      if (response.data === "successful") {
        // Handle success
        // Reload the issued books list or show a success message
        loadIssuedBooks();
      } else {
        // Handle unsuccessful return
      }
    } catch (error) {
      console.log(error);
      // Handle errors
    }
  };

  return (
    <div>
      <Typography variant="h4" component="h2" style={{ color: 'white' }} align="center" gutterBottom>
        ISSUE LIST
      </Typography>
      <table className="table table-striped">
        <thead>
          <tr style={{ color: 'white' }}>
            <th>#</th>
            <th>Id</th>
            <th>Book Name</th>
            <th>Genre</th>
            <th>Author</th>
            <th>Status</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {issuedBooks.map((issuedBook, index) => (
            <tr key={issuedBook.id}>
              <td style={{ color: 'white' }}>{index + 1}</td>
              <td style={{ color: 'white' }}>{issuedBook.id}</td>
              <td style={{ color: 'white' }}>{issuedBook.book.bookName}</td>
              <td style={{ color: 'white' }}>{issuedBook.book.genre}</td>
              <td style={{ color: 'white' }}>{issuedBook.book.author}</td>
              <td style={{ color: 'white' }}>{getStatus(issuedBook.book.statusOfBook)}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedBooks.includes(issuedBook.id)}
                  onChange={() => handleBookSelection(issuedBook.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        variant="contained"
        className="mt-4 custom-button"
        size="large"
        fullWidth
        onClick={handleReturnSelected}
      >
        Return Selected Books
      </Button>
    </div>
  );
}
