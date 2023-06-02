import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import LocalLibrary from '@mui/material/Icon';
import { Link } from 'react-router-dom';

export default function Homepage() {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', paddingTop: '40px' }}>
      <Typography variant="h2" component="h1" color='white' fontFamily="monotype corsiva " gutterBottom>
        Welcome  to  the  Bookworm  Library
      </Typography>
      <LocalLibrary sx={{ fontSize: 100 }} />
      <Typography variant="h5" component="p"  gutterBottom sx={{ marginTop: '30px',color:'white' }}>
        Discover. Learn. Immerse.
      </Typography>
      <Typography variant="body1" component="p" gutterBottom sx={{ marginBottom: '30px', color:'white' }}>
        Explore our vast collection of books across various genres and expand your knowledge.
      </Typography>
      <Button variant="contained" size="large" color="primary" component={Link} to="/booklist">
        Browse Books
      </Button>
    </Container>
  );
}
