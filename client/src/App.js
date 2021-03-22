import React, { useState } from 'react'
import Skill from './Components/Skill'
import { Button, Container, Col, FormControl, InputGroup, Row } from 'react-bootstrap'

const App = () => {
  const [skillList, setSkillList] = useState(
    [{
      name: 'Javascript',
      hours: 9
    },
    {
      name: 'ExpressJS',
      hours: 2.5
    }]
  );


  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col xs xl='6'>
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Enter Skill Name'
              aria-label='Enter Skill Name'
              aria-describedby='basic-addon2'
            />
            <InputGroup.Append>
              <Button variant='outline-secondary'>
                Create Skill
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col xs xl='6'>
          {skillList.map(skill => {
            return (
              <Skill
                skillList={skill}
              />
            )
          })}

        </Col>
      </Row>
    </Container>
  );
}

export default App;