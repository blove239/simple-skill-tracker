import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  FormControl,
  InputGroup,
} from 'react-bootstrap';

const CreateSkill = ({ skillList, setSkillList }) => {
  const [newSkillName, setNewSkillName] = useState('');

  const createSkill = () => {
    const tempSkillList = skillList.concat({ name: newSkillName, hours: 0 });
    setNewSkillName('');
    setSkillList(tempSkillList);
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      createSkill();
      setNewSkillName('');
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
  skillList: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSkillList: PropTypes.func.isRequired,
};
