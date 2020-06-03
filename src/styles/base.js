import { css } from '@emotion/core';

export const show = css`
  display: block;
`;

export const hidden = css`
  display: none;
`;

export const reset = css`
  margin: 0;
  display: block;
  padding: 0;
`;

export const scrollY = css`
  overflow-x: hidden;
  overflow-y: overlay;
`;

export const flex = css`
  display: flex;
  align-content: stretch;
  justify-content: space-between;
`;

export const transparent = css`
  background: transparent;
  border: none;
  outline: none;
`;

export const shadowAround = (theme) => css`
  box-shadow: 0 0 4px 0 ${theme.colors.shadow};
`;

export const blockquote = (theme) => css`
  font-size: 1.4em;
  width: 100%;
  margin: 50px auto;
  font-style: italic;
  color: ${theme.colors.color};
  padding: 14px 30px 14px 75px;
  border-left: 8px solid ${theme.colors.primary};
  line-height: 1.6;
  position: relative;
  background: ${theme.colors.border};

  &::before {
    content: '\\201C';
    color: ${theme.colors.primary};
    font-size: 4em;
    position: absolute;
    left: 10px;
    top: -10px;
  }

  &::after {
    content: '';
  }
  p {
    font-size: 16px;
    margin-top: 1.5em;
  }
`;
