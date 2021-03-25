import React from 'react'
import { Button, Col, ProgressBar, Row } from 'react-bootstrap'

const Skill = ({ incrementSkill, skill, skillIndex, resetSkill }) => {
    return (
        <Row>
            <Col>
                {skill.name}
                <Row className='mx-auto'>
                    Level {Math.floor(skill.hours / 5)}
                    <Button
                        className='mx-2'
                        variant='secondary' size='sm'
                        onClick={() => { resetSkill(skillIndex) }}
                    >
                        Reset Skill
                    </Button>
                    <Button
                        variant='secondary'
                        size='sm'
                        onClick={() => {incrementSkill(skillIndex)}}
                    >
                        Increment Skill
                    </Button>
                </Row>
                <ProgressBar now={((skill.hours % 5) / 5) * 100} label={`${skill.hours} hours`} />
            </Col>
        </Row>
    )
}

export default Skill;