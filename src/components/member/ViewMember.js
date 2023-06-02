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
  const [member, setMember] = useState({});
  const { memberId } = useParams();

  useEffect(() => {
    loadMember();
  }, []);

  const loadMember = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/member/${memberId}`);
      console.log(response.data);
      setMember(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="md">
      <Card variant="outlined" sx={{ mt: 4, backgroundColor: "#f5f5f5" }}>
        <CardHeader
          title="Member Details"
          sx={{ textAlign: "center", backgroundColor: "#e0e0e0" }}
        />
        <CardContent>
          <Typography variant="body1" component="div">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Id: {member.id}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Member Name: {member.userName}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Gender: {member.gender}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Email: {member.email}
                </Typography>
              </li>
              <li>
                <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                  Phone Number: {member.phoneNumber}
                </Typography>
              </li>
            </ul>
          </Typography>
        </CardContent>
      </Card>
      <Button
        component={Link}
        to="/"
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
      >
        Back to Home
      </Button>
    </Container>
  );
}
