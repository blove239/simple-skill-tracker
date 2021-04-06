import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  InputGroup,
} from 'react-bootstrap';

const CreateSkill = ({ updateSkills }) => {
  const [newSkillName, setNewSkillName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(true);
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
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log(err);
    }
    setNewSkillName('');
  };

  const handleSubmit = () => {
    if (newSkillName.length > 30) {
      setError(true);
      setErrorMessage('Skill name must be 30 characters or less.');
    } else if (newSkillName.length <= 2) {
      setError(true);
      setErrorMessage('Skill name must be at least 2 characters long');
    } else {
      setError(false);
      createSkill();
    }
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      handleSubmit();
    }
  };

  const handleChange = (e) => {
    setNewSkillName(e.target.value);
  };

  return (
    <InputGroup className="my-4">
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
  );
};

export default CreateSkill;

CreateSkill.propTypes = {
  updateSkills: PropTypes.func.isRequired,
};
