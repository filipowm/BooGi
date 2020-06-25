import PropTypes from "prop-types";
import React from 'react';
import { Sun as DayImage, Moon as NightImage } from 'react-feather';
import { ButtonIcon } from '../';

const DarkModeSwitch = ({ isDarkThemeActive, toggleActiveTheme, ...props }) => {
  const img = isDarkThemeActive ? NightImage : DayImage;
  return (
    <ButtonIcon icon={img} 
                onClick={toggleActiveTheme}
                title={'Switch theme'}
                {...props} />
  );
};

DarkModeSwitch.propTypes = {
  isDarkThemeActive: PropTypes.bool.isRequired,
  toggleActiveTheme: PropTypes.func.isRequired,
  background: PropTypes.string,
  hoverFill: PropTypes.string,
  hoverStroke: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
}

export default DarkModeSwitch;