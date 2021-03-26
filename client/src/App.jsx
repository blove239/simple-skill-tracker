import React, { useState } from 'react';
import {
  Button,
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
  const [newSkillName, setNewSkillName] = useState('');
  const [skillList, setSkillList] = useState([]);

  const [message, setMessage] = useState('');
  const { isLoading } = useAuth0();

  const serverUrl = process.env.REACT_APP_SERVERURL;

  const resetSkill = (index) => {
    const tempSkillList = skillList.slice();
    const tempSkill = skillList[index];
    tempSkill.hours = 0;
    tempSkillList[index] = tempSkill;
    setSkillList(tempSkillList);
  };

  const incrementSkill = (index) => {
    const tempSkillList = skillList.slice();
    const tempSkill = skillList[index];
    tempSkill.hours += 0.5;
    tempSkillList[index] = tempSkill;
    setSkillList(tempSkillList);
  };

  const createSkill = () => {
    const tempSkillList = skillList.concat({ name: newSkillName, hours: 0 });
    setSkillList(tempSkillList);
  };

  const handleChange = (e) => {
    setNewSkillName(e.target.value);
  };

  const { getAccessTokenSilently } = useAuth0();

  const callSecureApi = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(
        `${serverUrl}/authorized`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const responseData = await response.json();
      setMessage(responseData.message);
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <NavBar />
      <Button
        onClick={callSecureApi}
      >
        TEST FETCH
      </Button>
      <div>{message}</div>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs xl="6">
            <CreateSkill
              createSkill={createSkill}
              handleChange={handleChange}
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs xl="6">
            {skillList.map((skill, index) => (
              <Skill
                incrementSkill={incrementSkill}
                // key will change to id based from mongoDB on final version
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                resetSkill={resetSkill}
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
