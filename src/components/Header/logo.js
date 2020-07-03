// import Link from "../Link";
import React from 'react';
import styled from '@emotion/styled';
import { Link } from '../';
import { css } from '@emotion/core';
import { useTheme } from 'emotion-theming';

const showMenu = () => {
  let x = document.getElementById('navbar');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
};

const MobileToggle = styled(({ className }) => (
  <span onClick={showMenu} className={className} role={'button'} tabIndex={0}>
    <span></span>
    <span></span>
    <span></span>
  </span>
))`
  border: 1px solid ${(props) => props.theme.header.border};
  border-radius: 4px;
  width: 36px;
  height: 33px;
  position: absolute;
  right: 20px;
  padding: 8px 5px;
  display: none;
  cursor: pointer;
  transition: all 1s cubic-bezier(0.25, 0.8, 0.25, 1) 0s;
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    margin-right: 0;
    display: block;
  }
  &:hover {
    span:first-child {
      transform: rotate(8deg);
    }
    span:last-child {
      transform: rotate(-8deg);
    }
  }
  span {
    display: block;
    width: 22px;
    height: 2px;
    border-radius: 1px;
    margin: 4px auto 0;
    background-color: ${(props) => props.theme.header.font.base};

    &:first-child {
      margin-top: 0;
    }
  }
`;
// //

const logoStyle = (theme) => css`
  padding: 0 0;
  display: flex;
  align-items: center;
  @media (max-width: ${theme.breakpoints['small']}) {
    min-height: 40px;
  }
  img {
    width: 55px;
    margin-right: 16px;
    display: inline-block;
    @media (max-width: ${theme.breakpoints['large']}) {
      width: 50px;
    }
    @media (max-width: ${theme.breakpoints['small']}) {
      margin-right: 8px;
      width: 45px;
    }
  }

  span {
    height: auto;
    font-size: 26px;
    line-height: 1.5;
    color: ${theme.header.font.base};
    @media (max-width: ${theme.breakpoints['large']}) {
      font-size: 21px;
    }
    @media (max-width: ${theme.breakpoints['small']}) {
      font-size: 19px;
      flex: initial;
      padding: 0 15px 0 0;
    }
    &:hover {
      text-decoration: none;
      opacity: 0.8;
    }
  }
`;

const LogoWrapper = styled.div`
  margin-left: ${(props) => props.theme.layout.leftMargin};
`;

const Logo = styled(({ className, link, img, title }) => {
  const theme = useTheme();
  let split = title.split(' ');
  split[0] = '<strong>' + split[0];
  const last = split.length < 3 ? 0 : split.length - 2;
  split[last] = split[last] + '</strong>';
  const title2 = split.join(' ');
  return (
    <div className={className}>
      <LogoWrapper>
        <Link to={link} css={logoStyle(theme)}>
          <img className={'displayInline'} src={img} alt={'logo'} loading={'lazy'} />
          <span className={'displayInline'} dangerouslySetInnerHTML={{ __html: title2 }} />
        </Link>
      </LogoWrapper>
      <MobileToggle />
    </div>
  );
})`
  min-width: ${(props) => props.theme.layout.leftWidth};
  display: flex;
  align-items: center;
  border-right: 1px solid ${(props) => props.theme.header.border};
  @media (max-width: ${(props) => props.theme.breakpoints['small']}) {
    border-right: none;
    display: flex;
    min-width: auto;
    padding-right: 0;
    align-items: center;
  }
  @media (max-width: ${(props) => props.theme.breakpoints['large']}) {
    // flex: initial;
  }
`;

export default Logo;
