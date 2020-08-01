import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { ArrowRight } from 'react-feather';
import emoji from '../../utils/emoji';
import Link from '../Link';
import { shadowAround } from '../../styles';
import { decreaseIntensivity } from '../../utils/colors';

const BigLinkWrapper = styled.div`
  display: flex;
  cursor: pointer;
  width: 100%;
  padding: 16px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid transparent;
  align-items: center;
  transition: ${(props) => props.theme.transitions.hover};
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const LinkPath = styled.div`
  color: ${(props) => decreaseIntensivity(props.theme.colors.fontLight, 0.25)};
  font-size: 9pt;
  padding-left: 16px;
`;

const Title = styled.div`
  flex: 1 0;
  padding: 0 14px;
  color: ${(props) => props.theme.colors.primary};
  font-size: 12pt;
  font-weight: 500;
`;

export default ({ title, url }) => {
  const theme = useTheme();
  const path = url.replace(/(https:\/\/)|(http:\/\/)/, '');
  return (
    <Link to={url}>
      <BigLinkWrapper css={shadowAround}>
        <ArrowRight color={theme.colors.primary} size={23} />
        <Title>{emoji.emojify(title)}</Title>
        <LinkPath>{path}</LinkPath>
      </BigLinkWrapper>
    </Link>
  );
};
