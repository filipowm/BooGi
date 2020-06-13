import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

const ButtonIconWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
  margin: 0 5px;
  padding: 6px;

  background-color: ${(props) => props.background};
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    svg {
      fill: ${(props) => props.hover};
      stroke: ${(props) => props.hover};
    }
  }
  svg {
    transition: ${(props) => props.theme.transitions.hover};
    fill: ${(props) => props.fill};
    stroke: ${(props) => props.stroke};
  }
`;

const ButtonIcon = ({ icon, ...props }) => {
  return (
    <ButtonIconWrapper {...props} role={'button'} tabIndex={0}>
      {/* not defining color as a workaround to use css styling instead */}
      {icon.render({ color: '' })}
    </ButtonIconWrapper>
  );
};

ButtonIcon.propTypes = {
  background: PropTypes.string.isRequired,
  hover: PropTypes.string.isRequired,
  fill: PropTypes.string.isRequired,
  stroke: PropTypes.string.isRequired,
  icon: PropTypes.object.isRequired,
};

export default ButtonIcon;
