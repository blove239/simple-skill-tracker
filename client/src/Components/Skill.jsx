import React from 'react';
import {
  Button,
  Col,
  ProgressBar,
  Row,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const Skill = ({
  incrementSkill,
  skill,
  skillIndex,
  resetSkill,
}) => (
  <Row>
    <Col>
      {skill.name}
      <Row className="mx-auto">
        Level
        {' '}
        {Math.floor(skill.hours / 5)}
        <Button
          className="mx-2"
          variant="secondary"
          size="sm"
          onClick={() => { resetSkill(skillIndex); }}
        >
          Reset Skill
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => { incrementSkill(skillIndex); }}
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
  </Row>
);

export default Skill;

Skill.propTypes = {
  incrementSkill: PropTypes.func.isRequired,
  skill: PropTypes.number.isRequired,
  skillIndex: PropTypes.number.isRequired,
  resetSkill: PropTypes.func.isRequired,
};
