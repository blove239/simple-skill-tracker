import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import {
  Container,
} from 'react-bootstrap';

const Footer = () => (
  <Container className="fixed-bottom bg-light d-flex justify-content-center">
    <a
      className="mr-1 text-dark"
      href="https://github.com/blove239/simple-skill-tracker"
    >
      <FontAwesomeIcon icon={faGithub} />
    </a>
    / Made by
    <a
      className="ml-1 text-dark"
      href="https://brandonlove.ca"
    >
      Brandon Love.
    </a>
  </Container>
);

export default Footer;
