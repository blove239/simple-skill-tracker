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
  setSkillList,
  skillList,
  skillIndex,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  const api = process.env.REACT_APP_API;

  const incrementSkill = (index) => {
    const tempSkillList = skillList.slice();
    const tempSkill = skillList[index];
    tempSkill.hours += 0.5;
    tempSkillList[index] = tempSkill;
    setSkillList(tempSkillList);
  };

  const resetSkill = (index) => {
    const tempSkillList = skillList.slice();
    const tempSkill = skillList[index];
    tempSkill.hours = 0;
    tempSkillList[index] = tempSkill;
    setSkillList(tempSkillList);
  };

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    const response = await fetch(`${api}/skills/${skill._id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setSkillList(data.skills);
  };

  return (
    <Container>
      <Col>
        <Row>
          <Col>
            {skill.title}
            {skill._id}
          </Col>
          <Col className="d-flex justify-content-end">
            <Button
              size="sm"
              onClick={handleDelete}
            >
              DELETE
            </Button>
          </Col>
        </Row>
        <Row className="mx-auto">
          Level:
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
    </Container>
  );
};

export default Skill;

Skill.propTypes = {
  setSkillList: PropTypes.func.isRequired,
  skill: PropTypes.shape({
    dateCreated: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    isDeleted: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    hours: PropTypes.number.isRequired,
  }).isRequired,
  skillList: PropTypes.arrayOf(PropTypes.object).isRequired,
  skillIndex: PropTypes.number.isRequired,
};
