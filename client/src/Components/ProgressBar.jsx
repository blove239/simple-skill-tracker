import React from 'react';
import PropTypes from 'prop-types';

const ProgressBar = ({ bgColor, completed }) => {
  const containerStyles = {
    height: 16,
    width: '100%',
    backgroundColor: '#e0e0de',
    marginTop: '10px',
    borderRadius: 50,
  };

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgColor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 0.4s ease-in-out',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles} />
    </div>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  bgColor: PropTypes.string.isRequired,
  completed: PropTypes.number.isRequired,
};
