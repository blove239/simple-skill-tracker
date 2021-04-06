import React, { useEffect, useState } from 'react';

import {
  Container, Col, Row,
} from 'react-bootstrap';
import Skill from './Skill';
import { EIGHTEEN_HUNDRED_MILLISECONDS, EXAMPLE_SKILL, HALF_HOUR } from '../utils/constants';

const About = () => {
  const [hourCount, setHour] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHour(hourCount + HALF_HOUR);
    }, EIGHTEEN_HUNDRED_MILLISECONDS);

    return () => {
      clearTimeout(timeout);
    };
  }, [hourCount]);

  const combined = {
    ...EXAMPLE_SKILL,
    hours: hourCount,
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center">
        <Col className="text-center mt-3 mb-5" xs xl="6">
          <h1 className="display-4">About</h1>
          <p>
            A simple, gamified skill tracker.
          </p>
          <p>
            Keep track of your skills with a levelling system.
            Every five hours gain you a new level, motivating you to focus on your skills.
          </p>
          <p>
            Create an account, and start keeping track of your skills!
          </p>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
        <Col xs xl="6">
          <Skill
            disableButtons
            skill={combined}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default About;
