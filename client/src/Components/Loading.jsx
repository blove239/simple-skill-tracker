import React from 'react';
import { Container } from 'react-bootstrap';
import loading from '../assets/loading.svg';

const Loading = () => (
  <Container className="spinner d-flex justify-content-center">
    <img
      src={loading}
      alt="Loading"
    />
  </Container>
);

export default Loading;
