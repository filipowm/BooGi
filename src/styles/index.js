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
  box-shadow: 0 0 6px 0 ${theme.colors.shadow};
`;

export const blockquote = (theme) => css`
  font-size: 1.4em;
  width: 100%;
  margin: 30px auto;
  font-style: italic;
  color: ${theme.colors.font};
  padding: 14px 25px 14px 75px;
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
    top: -13px;
  }

  &::after {
    content: '';
  }
  p {
    font-size: 16px;
  }
`;

export const pre = css`
  background-color: transparent;
  border: 0 !important;
  font-size: 14px;
  display: grid;
  pre.prism-code {
    margin: 0;
    padding: 16px;
    overflow: auto;
    border-radius: 4px;
  }
`;

export const anchor = (theme) => css`
  transition: color 0.15s;
  color: ${theme.colors.primary};
  &:hover {
    color: ${theme.colors.primaryDark};
  }
`;

export const table = (theme) => css`
  padding: 0;
  border: 1px solid ${theme.table.border};
  border-radius: 4px;
  border-spacing: 0;
  overflow-wrap: normal;
  thead {
    background-color: ${theme.table.header.background};
    color: ${theme.table.header.font};
    tr {
      font-weight: bold;
      text-align: left;
      th:first-child {
        border-top-left-radius: 4px;
      }
      th:last-child {
        border-top-right-radius: 4px;
      }
      th {
        margin: 0;
        padding: 6px 13px;
      }
    }
  }

  tbody tr {
    border-top: 1px solid ${theme.table.primary};
    margin: 0;
    padding: 0;

    &:nth-child(even) {
      background-color: ${theme.table.evenRow};
    }

    &:nth-child(odd) {
      background-color: ${theme.table.oddRow};
    }

    &:last-child {
      td:first-child {
        border-bottom-left-radius: 4px;
      }
      td:last-child {
        border-bottom-right-radius: 4px;
      }
    }

    td {
      margin: 0;
      padding: 6px 13px;
    }
  }

  th :first-child,
  td :first-child {
    margin-top: 0;
  }

  th :last-child,
  td :last-child {
    margin-bottom: 0;
  }
`;

export const scrollbar = css`
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar {
    width: 10px;
    background-color: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 8px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

export const skipParagraph = css`
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

export const list = css`
  li {
    p {
      margin: 8px 0;
    }
    p:first-child {
      margin-top: 0;
    }
    p:last-child {
      margin-bottom: 0;
    }
    p:nth-child(n + 2):last-child {
      margin-bottom: 10px;
    }
  }
`;
