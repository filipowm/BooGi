import PropTypes from 'prop-types';
import React from 'react';
import styled from '@emotion/styled';

const ButtonIconWrapper = styled('div')`
  display: flex;
  justify-content: flex-end;
  padding: 4px;

  background-color: ${(props) => props.background};
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    svg {
      fill: ${(props) => props.hoverFill};
      stroke: ${(props) => props.hoverStroke};
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
  background: PropTypes.string,
  hoverFill: PropTypes.string,
  hoverStroke: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  icon: PropTypes.object.isRequired,
};

export default ButtonIcon;
