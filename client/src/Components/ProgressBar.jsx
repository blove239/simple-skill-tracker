import React from 'react';
import PropTypes from 'prop-types';
import {
  FIVE_HOURS,
  ONE_HUNDRED_PERCENT,
} from '../utils/constants';

const ProgressBar = ({ bgColor, skillHourCount }) => {
  const levelCount = () => ((skillHourCount % FIVE_HOURS) / FIVE_HOURS) * ONE_HUNDRED_PERCENT;
  const containerStyles = {
    height: 22,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    textAlign: 'center',
    position: 'relative',
  };

  const fillerStyles = {
    height: '100%',
    width: `${levelCount()}%`,
    backgroundColor: bgColor,
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 0.4s ease-in-out',
    justifyContent: 'center',
  };

  const hourStyle = {
    width: '100%',
    position: 'absolute',
  };

  return (
    <div style={containerStyles}>
      <div style={hourStyle}>
        {`${skillHourCount} hours`}
      </div>
      <div style={fillerStyles} />
    </div>
  );
};

export default ProgressBar;

ProgressBar.propTypes = {
  bgColor: PropTypes.string.isRequired,
  skillHourCount: PropTypes.number.isRequired,
};
