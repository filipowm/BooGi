import React from 'react';
import styled from '@emotion/styled';
import { Sun as DayImage, Moon as NightImage } from 'react-feather';

const StyledSwitch = styled('div')`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin: 0 20px 0 5px;
  padding: 6px;

  background-color: ${(props) => props.theme.darkModeSwitch.background};
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    svg {
      fill: ${(props) => props.theme.darkModeSwitch.hover};
      stroke: ${(props) => props.theme.darkModeSwitch.hover};
    }
  }
  svg {
    transition: ${(props) => props.theme.transitions.hover};
    fill: ${(props) => props.theme.darkModeSwitch.fill};
    stroke: ${(props) => props.theme.darkModeSwitch.stroke};
  }
`;

export const DarkModeSwitch = ({ isDarkThemeActive, toggleActiveTheme, ...props }) => {
  const img = isDarkThemeActive ? NightImage : DayImage;
  return (
    <StyledSwitch {...props} role={'button'} tabIndex={0} onClick={toggleActiveTheme}>
      {/* not defining color as a workaround to use css styling instead */}
      {img.render({ color: '' })}
    </StyledSwitch>
  );
};
