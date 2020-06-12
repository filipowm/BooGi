import React from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { paddingLeftRight } from './styles';

const topBottomPadding = css`
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const HitsWrapper = styled.div`
  height: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  z-index: 2;
  -webkit-overflow-scrolling: touch;
  width: 100%;
  margin-top: 10px;
  // @media only screen and (max-width: 991px) {
  //   width: 400px;
  //   max-width: 400px;
  // }
  // @media only screen and (max-width: 767px) {
  //   width: 100%;
  //   max-width: 500px;
  // }
  > * + * {
    border-top: 2px solid ${(props) => props.theme.search.border};
  }
  li {
    ${topBottomPadding};
    ${paddingLeftRight};
    &:hover {
      background-color: ${(props) => props.theme.search.hover};
      color: ${(props) => props.theme.search.font.hover};
    }
  }
  li + li {
    border-top: 1px solid ${(props) => props.theme.search.border};
  }
  * {
    margin-top: 0;
    padding: 0;
    color: ${(props) => props.theme.search.font.base};
  }
  ul {
    list-style: none;
  }
  mark {
    color: ${(props) => props.theme.search.mark.font};
    background: ${(props) => props.theme.search.mark.background};
  }
`;

const HitTitle = styled.div`
  font-weight: bold;
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 15px;
`;

const HitDetails = styled.div`
  padding-top: 4px;
  padding-bottom: 4px;
  font-size: 14px;
`;

export const Hit = ({ slug, title, details }) => (
  <Link to={slug}>
    <HitTitle>{title}</HitTitle>
    <HitDetails>{details}</HitDetails>
  </Link>
);
