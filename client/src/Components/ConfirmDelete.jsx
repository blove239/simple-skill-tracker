import React from 'react';
import {
  Button,
  Modal,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

const ConfirmDelete = ({
  handleDelete,
  setShow,
  show,
  skillTitle,
}) => {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal animation={false} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please confirm that you want to delete skill
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
              handleDelete();
            }}
          >
            Delete Skill
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ConfirmDelete;

ConfirmDelete.propTypes = {
  handleDelete: PropTypes.func.isRequired,
  setShow: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  skillTitle: PropTypes.string.isRequired,
};
