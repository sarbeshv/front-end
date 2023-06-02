import React from "react";
import { Container, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <footer style={{ color:"white", padding: "20px 0", marginTop: "auto" ,backgroundColor: "rgba(0, 0, 0, 0.3)"}}>
      <Container maxWidth="md">
        <Typography variant="body2" align="center">
          Contact Us: <Link style={{color:"khaki"}}href="mailto:contact@example.com">contact@example.com</Link> | Phone: <Link href="tel:+123456789" style={{color:"khaki"}}>+123456789</Link>
        </Typography>
        <Typography variant="body2" align="center" >
          Address: 123 Library Street, City, Country
        </Typography>
        <Typography variant="body2" align="center" color="white">
          &copy; {new Date().getFullYear()} Your Library Name. All rights reserved.
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
