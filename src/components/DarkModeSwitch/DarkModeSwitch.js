import PropTypes from "prop-types";
import React from 'react';
import { Sun as DayImage, Moon as NightImage } from 'react-feather';
import { ButtonIcon } from '../';
import { useTheme } from 'emotion-theming';

const DarkModeSwitch = ({ isDarkThemeActive, toggleActiveTheme, ...props }) => {
  const theme = useTheme();
  const img = isDarkThemeActive ? NightImage : DayImage;
  return (
    <ButtonIcon background={theme.darkModeSwitch.background}
                hover={theme.darkModeSwitch.hover}
                fill={theme.darkModeSwitch.fill}
                stroke={theme.darkModeSwitch.stroke}
                icon={img} 
                onClick={toggleActiveTheme}
                {...props} />
  );
};

DarkModeSwitch.propTypes = {
  isDarkThemeActive: PropTypes.bool.isRequired,
  toggleActiveTheme: PropTypes.func.isRequired
}

export default DarkModeSwitch;