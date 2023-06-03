import { Container, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Visibility, Edit, Delete } from '@mui/icons-material';
import "./list.css";

export default function MemberList() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    loadMembers();
  },[]);

  const loadMembers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/member');
      setMembers(response.data.data);
      console.log(members);
    } catch (error) {
      // Handle errors
    }
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/member/delete/${id}`);
    loadMembers();
  };

  return (
    <Container>
      <Typography variant="h3" component="h2" align="center" fontFamily="monotype corsiva" className="white-text" gutterBottom>
        MEMBER LIST
      </Typography>
      <table className="table table-striped">
        <thead align="center"> 
          <tr className="white-text">
            <th scope="col">#</th>
            <th scope="col">Id</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody align="center">
          {members.map((member, index) => (
            <tr key={member.id}>
              <th style={{ color: 'white' }} scope="row">{index + 1}</th>
              <td style={{ color: 'white' }}>00{member.id}</td>
              <td style={{ color: 'white' }}>{member.userName}</td>
              <td style={{ color: 'white' }}>{member.email}</td>
              <td>
                <Link to={`/viewmember/${member.id}`}>
                  <IconButton color="primary">
                    <Visibility />
                  </IconButton>
                </Link>
                <Link to={`/editmember/${member.id}`}>
                  <IconButton color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <IconButton
                  color="error"
                  onClick={() => deleteUser(member.id)}
                >
                  <Delete />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
