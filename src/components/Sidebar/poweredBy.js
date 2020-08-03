import React from 'react';
import styled from '@emotion/styled';
import { onMobile } from '../../styles/responsive';

const Trademark = styled(({ className, trademark }) => {
  return (
    <div className={className}>
      <img src={trademark} alt="powered by logo" loading={'lazy'} />
    </div>
  );
})`
  display: flex;
  img {
    svg * {
      color: ${(props) => props.theme.navigationSidebar.poweredBy.hover};
    }
    width: 25px;
  }
`;
const PoweredText = styled(({ className, text }) => (
  <div className={className}>
    <span>
      Powered By <b>{text}</b>
    </span>
  </div>
))`
  padding-left: 20px;
  span {
    font-size: 12px;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.625;
  }
`;

const PoweredBy = styled(({ className, trademark, name, link }) => (
  <div css={{ margin: '0 auto', width: 'fit-content' }}>
    <a className={className} href={link} target="_blank" rel="noreferrer">
      <Trademark trademark={trademark} />
      <PoweredText text={name} />
    </a>
  </div>
))`
  color: ${(props) => props.theme.navigationSidebar.poweredBy.font};
  margin: 12px;
  display: flex;
  align-items: center;
  margin-left: 0px;
  padding: 12px 18px;
  border-radius: 4px;
  text-decoration: none;
  background-color: ${(props) => props.theme.navigationSidebar.poweredBy.background};
  transition: ${(props) => props.theme.transitions.hoverColor};
  &:hover {
    border: 1px solid ${(props) => props.theme.navigationSidebar.poweredBy.hover};
    margin-top: 11px;
    color: ${(props) => props.theme.navigationSidebar.poweredBy.hover};
  }
  ${onMobile} {
    display: none;
  }
`;

export default PoweredBy;
