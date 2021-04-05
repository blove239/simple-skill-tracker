import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const ConfirmReset = ({
  handleReset,
  setShow,
  show,
  skillTitle,
}) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Skill Reset</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please confirm that you want to reset skill
          <span className="font-weight-bold">
            {' '}
            { skillTitle }
          </span>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="dark" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              handleClose();
              handleReset();
            }}
          >
            Reset Skill
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmReset;

ConfirmReset.propTypes = {
  handleReset: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  skillTitle: PropTypes.string.isRequired,
};
