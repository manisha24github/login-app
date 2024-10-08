import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const Welcome = () => {
  const location = useLocation();

  return (
    <Container>
      <h1>Hello User you are logged as {location.state.email}!</h1>
    </Container>
  );
};

export default Welcome;
