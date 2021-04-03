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

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      createSkill();
    }
  };

  const handleChange = (e) => {
    setNewSkillName(e.target.value);
  };

  return (
    <InputGroup className="mb-3">
      <FormControl
        placeholder="Enter Skill Name"
        aria-label="Enter Skill Name"
        aria-describedby="basic-addon2"
        value={newSkillName}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <InputGroup.Append>
        <Button
          variant="outline-secondary"
          onClick={createSkill}
        >
          Create Skill
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default CreateSkill;

CreateSkill.propTypes = {
  updateSkills: PropTypes.func.isRequired,
};
