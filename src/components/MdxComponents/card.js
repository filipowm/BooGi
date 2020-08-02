import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { ArrowRight } from 'react-feather';
import { shadowAround } from '../../styles';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 16px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: ${(props) => props.theme.transitions.hover};
`;

export default ({ ...props }) => {
  return <Card css={shadowAround} {...props} />;
};
