import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  Col,
  Container,
  ProgressBar,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Skill = ({
  skill,
  updateSkills,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const api = process.env.REACT_APP_API;

  const handleDelete = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${api}/skills/${skill._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        updateSkills();
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const patchSkill = async (attr) => {
    const bodyObject = {};
    bodyObject[attr] = true;
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${api}/skills/${skill._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyObject),
      });
      const data = await response.json();
      if (data.success) {
        updateSkills();
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleIncrement = async () => {
    patchSkill('incrementSkill');
  };

  const handleReset = async () => {
    patchSkill('resetSkill');
  };

  return (
    <Container>
      <Col>
        <Row>
          <Col>
            {skill.title}
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              size="sm"
              onClick={() => { handleDelete(); }}
            >
              DELETE
            </Button>
          </Col>
        </Row>
        <Row className="mx-auto">
          Level:
          {' '}
          {Math.floor(skill.hours / 5) + 1}
          <Button
            className="mx-2"
            variant="secondary"
            size="sm"
            onClick={() => { handleReset(); }}
          >
            Reset Skill
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => { handleIncrement(); }}
          >
            Increment Skill
          </Button>
        </Row>
        <ProgressBar
          className="example"
          label={`${skill.hours} hours`}
          now={((skill.hours % 5) / 5) * 100}
        />
      </Col>
    </Container>
  );
};

export default Skill;

Skill.propTypes = {
  skill: PropTypes.shape({
    dateCreated: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    hours: PropTypes.number.isRequired,
  }).isRequired,
  updateSkills: PropTypes.func.isRequired,
};
