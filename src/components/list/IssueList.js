import { Button, Container, IconButton, TextField, Typography} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function IssueList() {
  const [Issues, setIssues] = useState([]);

  useEffect(() => {
    loadIssues();
  }, []);

  const loadIssues = async () => {
    try {
      const response = await axios.get('http://localhost:8080/issues');
      setIssues(response.data);
      console.log(response.data);
    } catch (error) {
      // Handle errors
    }
  };

  const returnAllIssues = async (id) => {
    await axios.get(`http://localhost:8080/rest/issue/${id}/return/all`);
    loadIssues();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const indianDateFormat = date.toLocaleDateString("en-IN", options);
    return indianDateFormat;
  };

  const getStatus = (status) => {
    return status === 0 ? "Not Return" : "Books Returned";
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" fontFamily="monotype corsiva" align="center" style={{ color: 'white' }} gutterBottom>
        ISSUE LIST
      </Typography>
      <table className="table table-striped">
        <thead align="center">
          <tr style={{ color: 'white' }}>
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">Issue Name</th>
            <th scope="col">Notes</th>
            <th scope="col">Expected Date</th>
            <th scope="col">Status</th>
            <th> Action</th>
          </tr>
        </thead>
        <tbody align="center">
          {Issues.map((issue, index) => (
            <tr key={issue.id}>
              <th style={{ color: 'white' }} scope="row">{index + 1}</th>
              <td style={{ color: 'white' }}>00{issue.id}</td>
              <td style={{ color: 'white' }}>{formatDate(issue.issueDate)}</td>
              <td style={{ color: 'white' }}>{issue.notes}</td>
              <td style={{ color: 'white' }}>{formatDate(issue.expectedReturnDate)}</td>
              <td style={{ color: 'white' }}>{getStatus(issue.returned)}</td>
              <td>
                {issue.returned === 0 && (
                  <Link to={`/viewissue/${issue.id}`}>
                    <IconButton>
                    <EditIcon />
                    </IconButton>
                  </Link>
                )}
                <IconButton onClick={() => returnAllIssues(issue.id)}>
                  <CheckCircleIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
