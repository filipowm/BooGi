import React from 'react';
import { useTheme } from 'emotion-theming';
import styled from '@emotion/styled';

const JargonWrapper = styled.em`
  .jargon-term {
    text-decoration: underline dotted ${(props) => props.theme.colors.primary};
    &::after {
      content: '?';
      font-weight: bold;
      display: inline-block;
      transform: translate(0, -0.5em);
      font-size: 75%;
      color: ${(props) => props.theme.colors.primary};
      margin-left: 3px;
    }
    &:hover {
      position: relative;
      text-decoration: none;
      cursor: help;

      .jargon-info {
        color: ${(props) => props.theme.jargon.font};
        display: block;
        position: absolute;
        top: 1.5em;
        left: 0;
        background: ${(props) => props.theme.jargon.background};
        border: 1px solid ${(props) => props.theme.jargon.border};
        border-left: 4px solid ${(props) => props.theme.colors.primary};
        padding: 1rem;
        border-radius: 4px;
        font-size: 90%;
        min-width: 300px;
        max-width: 400px;
        z-index: 1;
        box-shadow: 0 0 4px 2px ${(props) => props.theme.jargon.shadow};
        span:first-child {
          width: 100%;
          padding-bottom: 10px;
          display: inline-block;
          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 0.5em;
            border-top: 1px solid ${(props) => props.theme.colors.primary};
            z-index: -1;
          }
        }
      }
    }

    .jargon-info {
      display: none;
    }
  }
`;

const Jargon = ({ children, ...props }) => {
  const theme = useTheme();
  return (
    <JargonWrapper theme={theme} {...props}>
      {children}
    </JargonWrapper>
  );
};

export default Jargon;
