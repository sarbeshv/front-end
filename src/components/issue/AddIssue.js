import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Snackbar,
  OutlinedInput,
} from "@mui/material";
import axios from "axios";
import "./Addissue.css";

export default function AddIssue() {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedMember, setSelectedMember] = useState("");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [expectedDate, setExpectedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    loadMembers();
    loadBooks();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/member");
      setMembers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadBooks = async () => {
    try {
      const response = await axios.get("http://localhost:8080/books");
      setBooks(response.data.data.books.filter((book) => book.statusOfBook != 2));
    } catch (error) {
      console.error(error);
    }
  };

  const handleMemberChange = (event) => {
    setSelectedMember(event.target.value);
  };

  const handleBookChange = (event) => {
    setSelectedBooks(event.target.value);
  };

  const handleExpectedDateChange = (event) => {
    setExpectedDate(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotes(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        member: selectedMember,
        books: selectedBooks,
        expectedDate: expectedDate,
        notes: notes,
      };
      const response = await axios.post("http://localhost:8080/rest/issue/save", payload);
      console.log(response.data); // Handle the response as needed
      setOpenSnackbar(true); // Open the snackbar
      setSelectedMember("");
      setSelectedBooks([]);
      setExpectedDate("");
      setNotes("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSnackbarClose = () => {
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
      <Typography variant="h4" align="center" fontFamily="monotype corsiva " color="white" gutterBottom>
        Issue Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
          <InputLabel id="member-label"style={{ color: 'white' }}>Member</InputLabel>
          <Select
            labelId="member-label"
            className="custom-textfield"
            id="member-select"
            value={selectedMember}
            onChange={handleMemberChange}
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
            required
          >
            {members.map((member) => (
              <MenuItem key={member.id} value={member.id}>
                {member.userName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 120 }} fullWidth>
          <InputLabel id="books-label" style={{ color: 'white' }}>Books</InputLabel>
          <Select
            labelId="books-label"
            id="books-select"
            multiple
            value={selectedBooks}
            onChange={handleBookChange}
            required
            input={
              <OutlinedInput
                label="Member"
                notched
                classes={{
                  notchedOutline: 'custom-notched-outline',
                }}
                style={{ borderColor: 'white', color: 'white' }}
              />
            }
          >
            {books.map((book) => (
              <MenuItem key={book.bookId} value={book.bookId}>
                {book.bookName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField 
          id="expected-date"
          label="Expected Date"
          type="date"
          value={expectedDate}
          onChange={handleExpectedDateChange}
          fullWidth
          required
          InputLabelProps={{
            shrink: true,
          }}
          sx={{ mt: 2 }}
        />
        <TextField
          id="notes"
          label="Notes"
          multiline
          rows={4}
          value={notes}
          className="custom-textfield"
          onChange={handleNotesChange}
          fullWidth
          required
          sx={{ mt: 2 }}
        />
        <Button
          className="mt-4 custom-button"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          type="submit"
        >
          Issue
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Book issued!"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      />
    </Container>
  );
}
