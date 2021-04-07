import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const MaxSkills = ({ setShow, show }) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Max Skill Count Reached</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Maximum skill count of 12 reached.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MaxSkills;

MaxSkills.propTypes = {
  setShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};
