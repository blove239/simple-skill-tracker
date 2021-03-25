import React from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

const CreateSkill = ({ createSkill, handleChange }) => {
    return (
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
    )
}

export default CreateSkill;