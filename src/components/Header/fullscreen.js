import React from 'react';
import styled from '@emotion/styled';
import { Maximize, Minimize } from 'react-feather';
import { useTheme } from 'emotion-theming';
import { ButtonIcon } from '../';

export const FullScreenEnter = styled(({ toggle, ...props }) => {
    const theme = useTheme();
    return (
      <ButtonIcon
        title={'Enter fullscreen mode'}
        background={theme.header.icons.background}
        hoverStroke={theme.header.icons.hover}
        fill={'transparent'}
        stroke={theme.header.icons.stroke}
        icon={Maximize}
        onClick={toggle}
        {...props}
      />
    );
  })``;
  
  export const FullScreenHeader = styled.div`
  display: ${(props) => (props.show ? 'flex' : 'none')};
  position: fixed;
  justify-content: flex-end;
  align-items: center;
  height: 32px;
  padding: 6px;
  width: 100%;
  z-index: 10;
  top: 0;
  background-color: ${(props) => props.theme.header.background};
  `;
  
  export const FullScreenClose = styled(({ className, toggle }) => {
    const theme = useTheme();
    return (
      <div className={className} onClick={toggle}>
        <span css={{marginRight: '6px'}}>Close full mode</span>
        <ButtonIcon
          title={'Close fullscreen mode'}
          background={theme.header.icons.background}
          hoverStroke={theme.header.icons.hover}
          fill={'transparent'}
          stroke={theme.header.icons.stroke}
          icon={Minimize}
        />
      </div>
    );
  })`
  display: flex;
  transition: ${(props) => props.theme.transitions.hover};
  cursor: pointer;
  align-items: center;
  font-size: 10pt;
  margin-right: 10px;
  &:hover{
    color: ${(props) => props.theme.colors.hover};
  }
  `;
  