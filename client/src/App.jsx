import React, { useState } from 'react';
import {
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import CreateSkill from './Components/CreateSkill';
import Loading from './Components/Loading';
import NavBar from './Components/NavBar';
import Skill from './Components/Skill';

const App = () => {
  const [skillList, setSkillList] = useState([]);
  const { isLoading } = useAuth0();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs xl="6">
            <CreateSkill
              skillList={skillList}
              setSkillList={setSkillList}
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs xl="6">
            {skillList.map((skill, index) => (
              <Skill
                // key will change to id based from mongoDB on final version
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                skillList={skillList}
                setSkillList={setSkillList}
                skillIndex={index}
                skill={skill}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
