import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { AlertCircle, AlertOctagon, AlertTriangle } from 'react-feather';
import { css } from '@emotion/core';

const skipParagraph = css`
  .paragraph {
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const HighlightWrapper = styled(({ className, children }) => (
  <div className={className}>{children}</div>
))`
  margin: 16px 0;
  padding: 14px;
  border: 1px solid ${(props) => props.border};
  background-color: ${(props) => props.background};
  color: ${(props) => props.font};
  align-items: center;
  display: flex;
  border-radius: 4px;
`;

const Highlight = ({ children, color, icon, ...props }) => {
  const theme = useTheme();
  const highlightColor = theme.highlights[color];
  return (
    <HighlightWrapper
      background={highlightColor.background}
      border={highlightColor.border}
      font={highlightColor.font}
      {...props}
    >
      <div css={{ marginRight: '16px', lineHeight: 0 }}>
        {icon.render({ color: highlightColor.border, size: 24 })}
      </div>
      <div css={skipParagraph}>{children}</div>
    </HighlightWrapper>
  );
};

export default {
  Warning: (props) =>
    Highlight({
      color: 'warning',
      icon: AlertTriangle,
      ...props,
    }),
  Error: (props) =>
    Highlight({
      color: 'error',
      icon: AlertOctagon,
      ...props,
    }),
  Info: (props) =>
    Highlight({
      color: 'info',
      icon: AlertCircle,
      ...props,
    }),
  Tip: (props) =>
    Highlight({
      color: 'tip',
      icon: AlertCircle,
      ...props,
    }),
};
