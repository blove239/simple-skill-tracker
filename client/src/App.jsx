import React, { useEffect, useState } from 'react';
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

  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  const updateSkills = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('http://localhost:8003/api/v1/skills',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      const data = await response.json();
      setSkillList(data.skills);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    if (isAuthenticated && !isLoading) {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch('http://localhost:8003/api/v1/users',
          {
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
    }
  }, [isAuthenticated, isLoading]);

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
              updateSkills={updateSkills}
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col xs xl="6">
            {skillList.map((skill) => (
              <Skill
                key={skill._id}
                skill={skill}
                updateSkills={updateSkills}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default App;
