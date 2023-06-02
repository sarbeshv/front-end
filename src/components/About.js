import React from 'react';
import { Container, Typography } from '@mui/material';

const About = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        backgroundColor: '#f2f2f2', // Change the background color
        padding: '2rem',
        borderRadius: '0.5rem',
      }}
    >
      <Typography variant="h4" color="primary" align="center" gutterBottom sx={{ fontWeight: 'bold' }}>
        About Us
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '2rem' }} color="text.secondary" align="justify">
        Welcome to our Library! We are dedicated to providing a wide range of books for all bookworms. Whether you're
        into fiction, non-fiction, or any genre in between, we have something for everyone.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '2rem' }} color="text.secondary" align="justify" gutterBottom>
        Our collection includes classic literature, contemporary bestsellers, educational resources, and much more. Feel
        free to explore our shelves and discover new worlds within the pages of our books.
      </Typography>
      <Typography variant="body1" sx={{ marginTop: '2rem' }} color="text.secondary" align="justify" gutterBottom>
        <Typography variant="h6" color="primary" gutterBottom>
          Our library is located at:
        </Typography>
        <Typography variant="body1" color="text.secondary">
          123 Main Street,
          <br />
          City, State, ZIP Code
        </Typography>
      </Typography>
    </Container>
  );
};

export default About;
