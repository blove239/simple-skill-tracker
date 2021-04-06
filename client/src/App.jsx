import React, { useEffect, useState } from 'react';
import {
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';
import About from './Components/About';
import CreateSkill from './Components/CreateSkill';
import Footer from './Components/Footer';
import Loading from './Components/Loading';
import NavBar from './Components/NavBar';
import Skill from './Components/Skill';
import './css/app.css';

const App = () => {
  const [skillList, setSkillList] = useState([]);
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();
  const api = process.env.REACT_APP_API;

  const updateSkills = async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch(`${api}/skills`,
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
        const response = await fetch(`${api}/users`,
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
        {isAuthenticated
          ? (
            <>
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
            </>
          )
          : <About /> }
        <Footer />
      </Container>
    </>
  );
};

export default App;
