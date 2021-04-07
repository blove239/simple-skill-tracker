import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  InputGroup,
} from 'react-bootstrap';
import MaxSkills from './MaxSkills';

import { ENTER_CHARCODE, MAX_INPUT_LEN, MIN_INPUT_LEN } from '../utils/constants';

const CreateSkill = ({ updateSkills }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);
  const [showMaxSkills, setShowMaxSkills] = useState(false);
  const api = process.env.REACT_APP_API;
  const { getAccessTokenSilently } = useAuth0();

  const createSkill = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${api}/skills`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ skill: newSkillName }),
      });
      const data = await response.json();
      if (data.success) {
        updateSkills();
      } else if (!data.success && data.message === 'max skill count reached') {
        setShowMaxSkills(true);
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
    setNewSkillName('');
  };

  const handleSubmit = () => {
    if (newSkillName.length > MAX_INPUT_LEN) {
      setError(true);
      setErrorMessage('Skill name must be 90 characters or less.');
    } else if (newSkillName.length <= MIN_INPUT_LEN) {
      setError(true);
      setErrorMessage('Skill name must be at least 2 characters long');
    } else {
      setError(false);
      createSkill();
    }
  };

  const handleKeyPress = (e) => {
    if (e.charCode === ENTER_CHARCODE) {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    setNewSkillName(e.target.value);
  };

  return (
    <>
      <MaxSkills
        show={showMaxSkills}
        setShow={setShowMaxSkills}
      />
      <InputGroup className="boxstyle my-4">
        <FormControl
          placeholder="Enter Skill Name"
          aria-label="Enter Skill Name"
          value={newSkillName}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          isInvalid={error}
        />
        <InputGroup.Append>
          <Button
            variant="outline-secondary"
            onClick={handleSubmit}
          >
            Create Skill
          </Button>
        </InputGroup.Append>
        <FormControl.Feedback type="invalid">
          {errorMessage}
        </FormControl.Feedback>
      </InputGroup>
    </>
  );
};

export default CreateSkill;

CreateSkill.propTypes = {
  updateSkills: PropTypes.func.isRequired,
};
