import React, { useState } from 'react'
import Skill from './Components/Skill'
import { Button, Container, Col, FormControl, InputGroup, Row } from 'react-bootstrap'

const App = () => {
  const [newSkillName, setNewSkillName] = useState('');
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

  const resetSkill = (index) => {
    let tempSkillList = skillList.slice()
    let tempSkill = skillList[index]
    tempSkill.hours = 0
    tempSkillList[index] = tempSkill
    setSkillList(tempSkillList)
  }

  const incrementSkill = (index) => {
    let tempSkillList = skillList.slice()
    let tempSkill = skillList[index]
    tempSkill.hours += 0.5
    tempSkillList[index] = tempSkill
    setSkillList(tempSkillList)
  }

  const createSkill = () => {
    const tempSkillList = skillList.concat({ name: newSkillName, hours: 0 })
    setSkillList(tempSkillList)
  }

  const handleChange = (e) => {
    setNewSkillName(e.target.value)
  }

  return (
    <Container>
      <Row className='d-flex justify-content-center'>
        <Col xs xl='6'>
          <InputGroup className='mb-3'>
            <FormControl
              placeholder='Enter Skill Name'
              aria-label='Enter Skill Name'
              aria-describedby='basic-addon2'
              onChange={handleChange}
            />
            <InputGroup.Append>
              <Button
                variant='outline-secondary'
                onClick={createSkill}
              >
                Create Skill
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row className='d-flex justify-content-center'>
        <Col xs xl='6'>
          {skillList.map((skill, index) => {
            return (
              <Skill
                incrementSkill={incrementSkill}
                key={index}
                resetSkill={resetSkill}
                skillIndex={index}
                skill={skill}
              />
            )
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default App;