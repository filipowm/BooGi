import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { ArrowRight } from 'react-feather';
import emoji from '../../utils/emoji';
import Link from '../Link';
import { decreaseIntensivity } from '../../utils/colors';
import Card from './card';

const LinkCard = styled(Card)`
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const LinkPath = styled.div`
  color: ${(props) => decreaseIntensivity(props.theme.colors.fontLight, 0.25)};
  font-size: 9pt;
  padding-left: 16px;
  text-align: right;
`;

const Title = styled.div`
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
      <LinkCard>
        <ArrowRight color={theme.colors.primary} size={23} />
        <Title>{emoji.emojify(title)}</Title>
        <LinkPath>{path}</LinkPath>
      </LinkCard>
    </Link>
  );
};
