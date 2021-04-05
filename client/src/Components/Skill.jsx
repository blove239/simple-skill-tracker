import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {
  Button,
  Col,
  Container,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faUndoAlt } from '@fortawesome/free-solid-svg-icons';
import ConfirmDelete from './ConfirmDelete';
import ProgressBar from './ProgressBar';
import {
  COLOR_LIST,
  COLOR_LIST_LENGTH,
  FIVE_HOURS,
  ONE_HUNDRED_PERCENT,
} from '../utils/constants';

const Skill = ({
  skill,
  updateSkills,
}) => {
  const [currentColorNum, setCurrentColorNum] = useState(0);
  const [showDelete, setShowDelete] = useState(false);
  const handleShowDelete = () => setShowDelete(true);
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

  useEffect(() => {
    setCurrentColorNum((Math.floor(skill.hours / FIVE_HOURS)) % COLOR_LIST_LENGTH);
  }, [skill.hours]);

  return (
    <Container className="mb-4">
      <ConfirmDelete
        show={showDelete}
        setShow={setShowDelete}
        skillTitle={skill.title}
        handleDelete={handleDelete}
      />
      <Col>
        <Row>
          <Col className="font-weight-bold">
            {skill.title}
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              size="sm"
              variant="dark"
              onClick={() => { handleShowDelete(); }}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
          </Col>
        </Row>
        <Row className="ml-3">
          Level:
          {' '}
          {Math.floor(skill.hours / FIVE_HOURS) + 1}
          <Button
            className="ml-3"
            onClick={() => { handleReset(); }}
            size="sm"
            variant="secondary"
          >
            <FontAwesomeIcon icon={faUndoAlt} />
          </Button>
          <Button
            className="ml-3"
            onClick={() => { handleIncrement(); }}
            size="sm"
            variant="secondary"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Row>
        <ProgressBar
          bgColor={COLOR_LIST[currentColorNum]}
          completed={((skill.hours % FIVE_HOURS) / FIVE_HOURS) * ONE_HUNDRED_PERCENT}
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
