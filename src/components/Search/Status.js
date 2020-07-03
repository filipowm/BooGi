import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { marginLeftRight } from './styles';

const queryToken = css`
  font-weight: bold;
  font-style: italic;
  display: block;
`;

const StatusWrapper = styled.div`
  margin: 30px auto;
  text-align: center;
  line-height: 30px;
  span {
    font-size: 1.2em;
  }
`;

const spinner = css`
  width: 40px;
  height: 40px;

  position: relative;
  margin: 0 auto;

  .double-bounce1,
  .double-bounce2 {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #333;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation: sk-bounce 2s infinite ease-in-out;
    animation: sk-bounce 2s infinite ease-in-out;
  }

  .double-bounce2 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }

  @-webkit-keyframes sk-bounce {
    0%,
    100% {
      -webkit-transform: scale(0);
    }
    50% {
      -webkit-transform: scale(1);
    }
  }

  @keyframes sk-bounce {
    0%,
    100% {
      transform: scale(0);
      -webkit-transform: scale(0);
    }
    50% {
      transform: scale(1);
      -webkit-transform: scale(1);
    }
  }
`;

const Loading = ({ ...props }) => (
  <div css={spinner} {...props}>
    <div className={'double-bounce1'}></div>
    <div className={'double-bounce2'}></div>
  </div>
);

const SearchStatus = ({ searching, noHits, query }) => {
  let text = '';
  if (searching) {
    text = 'Searching...';
  } else if (noHits) {
    text = `No results found for `;
  }
  return text !== '' ? (
    <div css={marginLeftRight}>
      <StatusWrapper>
        <span>{text}</span>
        {noHits ? <span css={queryToken}>{query}</span> : ''}
        {searching ? <Loading css={{ margin: '20px auto' }} /> : ''}
      </StatusWrapper>
    </div>
  ) : (
    ''
  );
};

export default SearchStatus;
