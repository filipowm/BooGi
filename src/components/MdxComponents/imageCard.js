import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from 'emotion-theming';
import Card from './card';

const ImageCard = styled(Card)`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    width: 100%;
    height: 100%;
  }
`;

const Image = styled.img`
align-self: center;
border-radius: 4px; 
`;


const Text = styled.p`
margin-top: 15px;
& > p:first-child {
    margin-top: 0;
}
& > p:last-child {
    margin-bottom: 0;
}
`;

export default ({ children, width, height, src}) => {
  const theme = useTheme();
  const imgWidth = width ? width : '50%';
  const imgHeight = width ? width : '50%';
  return (
      <ImageCard width={imgWidth} height={imgHeight}>
        <Image src={src} />
        <Text>{children}</Text>
      </ImageCard>
  );
};
