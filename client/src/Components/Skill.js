import React from 'react'
import { Button, Col, ProgressBar, Row } from 'react-bootstrap'

const Skill = ({ skillList }) => {
    return (
        <Row>
            <Col>
                {skillList.name}
                <Row className='mx-auto'>
                    Level {Math.floor(skillList.hours / 5)}
                    <Button className='mx-2' variant='secondary' size='sm'>
                        Reset Skill
                    </Button>
                    <Button variant='secondary' size='sm'>
                        Increment Skill
                    </Button>
                </Row>
                <ProgressBar now={((skillList.hours % 5) / 5) * 100} />
            </Col>
        </Row>
    )
}

export default Skill;