import React, { useEffect, useState } from "react";
import { Button, Container, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "./Addmember.css";

export default function EditMember() {
    const [memberData, setMemberData] = useState({});
    const { memberId } = useParams();
  
    const onInputChange = (e) => {
      setMemberData({ ...memberData, [e.target.name]: e.target.value });
    };
  
    useEffect(() => {
      loadMembers();
    }, []);
  
    const loadMembers = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/member/${memberId}`);
        console.log(response.data);
        setMemberData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const sendFormData = async (data) => {
      try {
        const response = await axios.put(
          `http://localhost:8080/member/update/${memberId}`,
          data
        );
        console.log(response.data); // Handle the response as needed
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      sendFormData(memberData);
      console.log("member data", memberData);
    };
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" align="center" fontFamily="monotype corsiva "  color="white" gutterBottom>
          Edit Member
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ boxShadow: 2 }}
            label="userName"
            name="userName"
            className="custom-textfield"
            fullWidth
            margin="normal"
            onChange={onInputChange}
            required
            value={memberData.userName || ""}
          />
          <TextField
            sx={{ boxShadow: 2 }}
            label="gender"
            name="gender"
            className="custom-textfield"
            fullWidth
            margin="normal"
            onChange={onInputChange}
            required
            value={memberData.gender || ""}
          />
          <TextField
            sx={{ boxShadow: 2 }}
            label="email"
            name="email"
            className="custom-textfield"
            fullWidth
            margin="normal"
            onChange={onInputChange}
            required
            value={memberData.email || ""}
          />
          <TextField
            sx={{ boxShadow: 2 }}
            label="phoneNumber"
            name="phoneNumber"
            className="custom-textfield"
            fullWidth
            margin="normal"
            onChange={onInputChange}
            required
            value={memberData.phoneNumber || ""}
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
          <Link to="/">
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
  