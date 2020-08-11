import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import { Download } from 'react-feather';
import emoji from '../../utils/emoji';
import { decreaseIntensivity } from '../../utils/colors';
import Card from './card';

const DownloadCard = styled(Card)`
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const DownloadPath = styled.div`
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
  flex: 1;
`;

export default ({ title, url }) => {
  const theme = useTheme();
  const splitted = url.split('/')
  const filename = splitted[splitted.length - 1]
  return (
    <a href={url} download>
      <DownloadCard title={`Download file ${filename}`}>
        <Download color={theme.colors.primary} size={23} />
        <Title>{emoji.emojify(title)}</Title>
        <DownloadPath>{filename}</DownloadPath>
      </DownloadCard>
    </a>
  );
};
